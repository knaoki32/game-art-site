import { useState } from 'react'

/** ご依頼内容の選択肢。サイトの3商品に対応させる */
const KINDS = [
  'キャラクター一貫性・DLC展開キット',
  'Steamローンチ・ビジュアルキット',
  'LiveOps・コミュニティ素材パック(月次)',
  '追加キャラクターの新規デザイン',
  'その他・相談して決めたい',
]

/** ご予算感。掲載価格(22万円〜/30万円〜/月額24万円〜)を挟む刻みにする */
const BUDGETS = [
  '〜20万円(単発・小規模)',
  '20〜50万円',
  '50〜100万円',
  '100万円以上',
  '月額での継続運用を検討(LiveOps)',
  '未定・相談して決めたい',
]

type Status = 'idle' | 'sending' | 'done' | 'error'

const label = 'block text-sm font-bold'
const req = <span className="ml-1 text-sm font-bold text-gold">必須</span>
const field =
  'mt-2 w-full rounded-md border border-line bg-card px-3 py-2.5 text-sm text-body ' +
  'placeholder:text-mute focus:border-gold focus:outline-none'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setError('')

    const fd = new FormData(e.currentTarget)
    const payload = {
      name: fd.get('name'),
      company: fd.get('company'),
      email: fd.get('email'),
      kinds: fd.getAll('kinds'),
      deadline: fd.get('deadline'),
      budget: fd.get('budget'),
      message: fd.get('message'),
      website: fd.get('website'), // ハニーポット(人には見えない)
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = (await res.json()) as { ok: boolean; error?: string }
      if (!res.ok || !data.ok) {
        setError(data.error ?? '送信できませんでした。時間をおいてお試しください。')
        setStatus('error')
        return
      }
      setStatus('done')
    } catch {
      setError('通信に失敗しました。ネットワークをご確認ください。')
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div
        role="status"
        className="rounded-lg border border-gold bg-card p-8 text-center"
      >
        <p className="text-base font-black">送信しました。ありがとうございます。</p>
        <p className="mt-3 text-sm leading-relaxed text-mute">
          2営業日以内にご返信します。
          <br />
          返信が届かない場合は、迷惑メールフォルダをご確認いただくか、XのDMからご連絡ください。
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="text-left" noValidate>
      {/* ハニーポット: 人には見えない。埋まっていたら機械とみなして捨てる */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor="website">ここは入力しないでください</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="name">
            お名前(ご担当者様){req}
          </label>
          <input id="name" name="name" type="text" required className={field} autoComplete="name" />
        </div>
        <div>
          <label className={label} htmlFor="company">
            会社名・タイトル名(任意)
          </label>
          <input
            id="company"
            name="company"
            type="text"
            className={field}
            autoComplete="organization"
          />
        </div>
      </div>

      <div className="mt-5">
        <label className={label} htmlFor="email">
          メールアドレス(ご返信先){req}
        </label>
        <input id="email" name="email" type="email" required className={field} autoComplete="email" />
      </div>

      <fieldset className="mt-6">
        <legend className={label}>
          ご依頼内容(複数選択可){req}
        </legend>
        <div className="mt-2 grid gap-2">
          {KINDS.map((k) => (
            <label key={k} className="flex cursor-pointer items-start gap-2.5 py-1 text-sm">
              <input
                type="checkbox"
                name="kinds"
                value={k}
                className="mt-0.5 h-6 w-6 shrink-0 accent-[var(--color-gold)]"
              />
              {k}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <legend className={label}>
          ご予算感{req}
        </legend>
        <div className="mt-2 grid gap-2">
          {BUDGETS.map((b) => (
            <label key={b} className="flex cursor-pointer items-start gap-2.5 py-1 text-sm">
              <input
                type="radio"
                name="budget"
                value={b}
                required
                className="mt-0.5 h-6 w-6 shrink-0 accent-[var(--color-gold)]"
              />
              {b}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6">
        <label className={label} htmlFor="deadline">
          ご希望の納期(目安・任意)
        </label>
        <input
          id="deadline"
          name="deadline"
          type="text"
          placeholder="例: 2026年10月中旬"
          className={field}
        />
      </div>

      <div className="mt-5">
        <label className={label} htmlFor="message">
          ご相談内容(用途・イメージ・参考URLなど){req}
        </label>
        <textarea id="message" name="message" required rows={6} className={field} />
      </div>

      {status === 'error' && (
        <p role="alert" className="mt-5 rounded-md border border-line bg-card-2 p-3 text-sm">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-6 w-full rounded-md bg-gold-fill px-6 py-3 text-sm font-bold text-ink transition-colors hover:bg-gold-soft disabled:opacity-60 sm:w-auto"
      >
        {status === 'sending' ? '送信中…' : 'この内容で相談する'}
      </button>
      <p className="mt-3 text-sm text-mute">
        送信内容は問い合わせ対応にのみ使用します。第三者への提供はしません。
      </p>
    </form>
  )
}
