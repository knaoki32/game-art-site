import Section from '../components/Section'

const policies = [
  {
    title: '秘密保持(NDA)',
    body: 'NDA締結に対応します。未発表タイトル・企画段階の情報も安全に共有いただけます。実績としての掲載は、事前の許諾をいただいた場合のみ行います。',
  },
  {
    title: '商用利用・権利',
    body: '納品物は商用利用いただけます。利用範囲・二次利用の条件は契約時に書面で明文化します。貴社からお預かりした素材(既存キャラクター・設定資料)は、目的外利用・学習利用をしません。',
  },
  {
    title: 'AI利用の方針',
    body: '制作工程に生成AIを使用します(隠しません)。商用利用可能なツール・プランのみを使用し、基準画像とプロンプトで工程を記録・再現します。全納品物に人手の修正・仕上げを行い、第三者の著作物を意図的に模倣することはありません。',
  },
]

const faqs = [
  {
    q: '既存キャラクターの絵柄に合わせられますか?',
    a: '本制作の前に「基準になる1枚」を制作・提出し、絵柄をご確認いただきます。合意後に量産へ進むため、イメージと違うものが大量に納品されるリスクがありません。',
  },
  {
    q: 'SteamのAI利用開示(AI Generated Content Disclosure)には対応できますか?',
    a: '対応します。ストア申告に必要な工程情報(AI利用の範囲・人手工程の内容)を提供できます。',
  },
  {
    q: '納品後、時間が空いてからの追加発注はできますか?',
    a: 'できます。基準画像と制作条件をキャラクターごとに保管しているため、時間が空いた追加発注でも一貫性を再現しやすい工程で対応します。',
  },
  {
    q: '修正には対応してもらえますか?',
    a: '対応します。修正回数・範囲は契約時に明記します。',
  },
  {
    q: '英語でのやり取りは可能ですか?',
    a: '可能です。Inquiries and project communication in English are welcome.',
  },
  {
    q: '漫画や動画もお願いできますか?',
    a: '可能です。同じ基準画像から画像・漫画・動画を横断して制作できます(フルカラー漫画109ページの完結実績があります)。',
  },
]

export default function Policy() {
  return (
    <Section
      id="policy"
      kicker="Policy & FAQ"
      title="安心して発注いただくために。"
      lead="権利・秘密保持・AI利用について、契約前に確認されることを先にすべて開示します。"
      tinted
    >
      <div className="grid gap-5 md:grid-cols-3">
        {policies.map((p) => (
          <div key={p.title} className="rounded-lg border border-line bg-card p-6">
            <h3 className="text-sm font-black">{p.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-mute">{p.body}</p>
          </div>
        ))}
      </div>

      <h3 className="mt-12 text-lg font-black">よくある質問</h3>
      <div className="mt-4 divide-y divide-line rounded-lg border border-line bg-card">
        {faqs.map((f) => (
          <details key={f.q} className="group px-6 py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold [&::-webkit-details-marker]:hidden">
              {f.q}
              <span
                aria-hidden="true"
                className="shrink-0 text-gold transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-mute">{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
  )
}
