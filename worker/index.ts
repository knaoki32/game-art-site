/**
 * サイト内問い合わせフォームの受け口。
 *
 * - POST /api/contact  … フォーム送信を受け、検査してKVに保存する
 * - GET  /admin/contacts … 保存された問い合わせの一覧(ADMIN_TOKENが要る)
 * - それ以外           … 静的アセット(dist/)をそのまま返す
 *
 * 送信内容はKVにしか保存しない(外部送信なし)。届いたかどうかは管理ページで見る。
 */

interface Env {
  ASSETS: Fetcher
  CONTACT_KV: KVNamespace
  ADMIN_TOKEN?: string
}

/** 受け取る項目。フォーム側(Contact.tsx)と対で変える */
interface Submission {
  name: string
  company: string
  email: string
  kinds: string[]
  deadline: string
  budget: string
  message: string
}

const LIMITS = {
  name: 100,
  company: 100,
  email: 200,
  deadline: 50,
  budget: 60,
  message: 4000,
  kind: 80,
  kindsMax: 10,
  /** 1つのIPが再送できるまでの秒数 */
  cooldownSec: 60,
  /** 保存期間(90日)。問い合わせは永久保存しない */
  ttlSec: 60 * 60 * 24 * 90,
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  })

const str = (v: unknown, max: number) =>
  typeof v === 'string' ? v.trim().slice(0, max) : ''

/** 見た目だけの検査。厳密なRFC準拠は狙わない(弾きすぎる方が損) */
const looksLikeEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

async function handleContact(request: Request, env: Env): Promise<Response> {
  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return json({ ok: false, error: '送信内容を読み取れませんでした。' }, 400)
  }

  // ハニーポット: 人には見えない項目。埋まっていたら機械なので、
  // 成功したように見せて捨てる(失敗を返すと機械が学習して回避する)
  if (str(body.website, 200) !== '') return json({ ok: true })

  const sub: Submission = {
    name: str(body.name, LIMITS.name),
    company: str(body.company, LIMITS.company),
    email: str(body.email, LIMITS.email),
    kinds: Array.isArray(body.kinds)
      ? body.kinds.slice(0, LIMITS.kindsMax).map((k) => str(k, LIMITS.kind)).filter(Boolean)
      : [],
    deadline: str(body.deadline, LIMITS.deadline),
    budget: str(body.budget, LIMITS.budget),
    message: str(body.message, LIMITS.message),
  }

  const missing: string[] = []
  if (!sub.name) missing.push('お名前')
  if (!sub.email) missing.push('メールアドレス')
  if (!sub.message) missing.push('ご相談内容')
  if (sub.kinds.length === 0) missing.push('ご依頼内容')
  if (!sub.budget) missing.push('ご予算感')
  if (missing.length > 0) {
    return json({ ok: false, error: `${missing.join('・')}を入力してください。` }, 400)
  }
  if (!looksLikeEmail(sub.email)) {
    return json({ ok: false, error: 'メールアドレスの形式をご確認ください。' }, 400)
  }

  // 連投の抑制。IPごとに一定時間は1件だけ受ける
  const ip = request.headers.get('cf-connecting-ip') ?? 'unknown'
  const rateKey = `rate:${ip}`
  if (await env.CONTACT_KV.get(rateKey)) {
    return json(
      { ok: false, error: '送信の間隔が短すぎます。1分ほど置いてからお試しください。' },
      429,
    )
  }
  await env.CONTACT_KV.put(rateKey, '1', { expirationTtl: LIMITS.cooldownSec })

  const receivedAt = new Date().toISOString()
  const key = `contact:${receivedAt}:${crypto.randomUUID().slice(0, 8)}`
  await env.CONTACT_KV.put(
    key,
    JSON.stringify({
      ...sub,
      receivedAt,
      ua: request.headers.get('user-agent') ?? '',
      country: request.headers.get('cf-ipcountry') ?? '',
    }),
    { expirationTtl: LIMITS.ttlSec },
  )

  return json({ ok: true })
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string,
  )

async function handleAdmin(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url)
  const token = url.searchParams.get('token') ?? request.headers.get('x-admin-token') ?? ''
  if (!env.ADMIN_TOKEN || token !== env.ADMIN_TOKEN) {
    return new Response('Unauthorized', { status: 401 })
  }

  const list = await env.CONTACT_KV.list({ prefix: 'contact:' })
  const items = await Promise.all(
    list.keys
      .sort((a, b) => (a.name < b.name ? 1 : -1)) // 新しい順
      .map(async (k) => {
        const raw = await env.CONTACT_KV.get(k.name)
        return raw ? (JSON.parse(raw) as Submission & { receivedAt: string }) : null
      }),
  )

  const rows = items
    .filter((v): v is Submission & { receivedAt: string } => v !== null)
    .map(
      (v) => `<article>
  <h2>${esc(v.name)}<span>${esc(v.company) || '—'}</span></h2>
  <p class="meta">${esc(v.receivedAt)}　<a href="mailto:${esc(v.email)}">${esc(v.email)}</a></p>
  <p class="tags">${v.kinds.map((k) => `<span>${esc(k)}</span>`).join('')}</p>
  <p class="meta">予算: ${esc(v.budget)}　納期: ${esc(v.deadline) || '指定なし'}</p>
  <pre>${esc(v.message)}</pre>
</article>`,
    )
    .join('\n')

  const html = `<!doctype html><html lang="ja"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>問い合わせ一覧</title>
<style>
 body{font-family:system-ui,sans-serif;background:#f7f3ea;color:#232228;margin:0;padding:24px;line-height:1.8}
 h1{font-size:20px;margin:0 0 16px}
 article{background:#fff;border:1px solid #e2dbc7;border-radius:8px;padding:16px;margin-bottom:16px}
 h2{font-size:16px;margin:0 0 4px;display:flex;gap:8px;align-items:baseline}
 h2 span{font-size:14px;font-weight:400;color:#5e5c64}
 .meta{font-size:14px;color:#5e5c64;margin:2px 0}
 .tags span{display:inline-block;background:#e2dbc7;border-radius:6px;padding:2px 8px;margin:2px 4px 2px 0;font-size:14px}
 pre{white-space:pre-wrap;background:#f7f3ea;border-radius:6px;padding:12px;margin:8px 0 0;font-family:inherit;font-size:14px}
 .empty{color:#5e5c64}
</style></head><body>
<h1>問い合わせ一覧（${items.filter(Boolean).length}件・新しい順・保存は90日）</h1>
${rows || '<p class="empty">まだ届いていません。</p>'}
</body></html>`

  return new Response(html, {
    headers: { 'content-type': 'text/html; charset=utf-8', 'x-robots-tag': 'noindex' },
  })
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname === '/api/contact') {
      if (request.method !== 'POST') return json({ ok: false, error: 'POSTのみ' }, 405)
      return handleContact(request, env)
    }

    if (url.pathname === '/admin/contacts') return handleAdmin(request, env)

    // それ以外は静的アセットへ
    return env.ASSETS.fetch(request)
  },
} satisfies ExportedHandler<Env>
