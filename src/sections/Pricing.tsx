import Section from '../components/Section'

const plans = [
  {
    name: 'Character Continuity & DLC Kit',
    nameJa: 'キャラクター一貫性・DLC展開キット',
    featured: true,
    scope: '衣装3種 × 立ち絵・差分一式+ストア用書き出し、基準画像・制作条件の構築を含む',
    price: '22万円〜',
    priceNote: '参考価格。衣装数・点数により変動します',
  },
  {
    name: 'Steam Launch Visual Kit',
    nameJa: 'Steamローンチ・ビジュアルキット',
    scope: 'カプセル一式(3規格)+OGP・SNS告知画像+PV用カットイン',
    price: '30万円〜',
    priceNote: '参考価格。素材の範囲により変動します',
  },
  {
    name: 'LiveOps Community Creative Pack',
    nameJa: 'LiveOps・コミュニティ素材パック(月次)',
    scope: '月次の点数レンジ制。イベント絵・SNS素材・告知素材を継続供給',
    price: '月額24万円〜',
    priceNote: '参考価格。月間の点数レンジにより変動します',
  },
]

const included = [
  '一貫性検証サンプル(本制作前に絵柄を確認)',
  '修正対応(回数は契約時に明記)',
  '商用利用権',
  '各媒体規格での書き出し',
]

/**
 * 料金目安。1枚あたり単価は出さない(単発の画像業者の値付けに見えるため)。
 * パック=プロジェクト規模の予算枠として提示する。
 */
export default function Pricing() {
  return (
    <Section
      id="pricing"
      kicker="料金の目安"
      title="料金の目安。キット単位の参考価格です。"
      lead="以下は参考価格です。点数・規模・運用期間によって変動するため、正式なお見積りは内容を伺ったうえでご提案します。お見積り・ご相談は無料です。"
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`rounded-lg border p-6 sm:p-7 ${
              p.featured ? 'border-gold bg-card' : 'border-line bg-card/60'
            }`}
          >
            {/* 日本語のページなので見出しは日本語。英語の商品名は副題に置く */}
            <h3 className="text-base font-black leading-snug">{p.nameJa}</h3>
            <p className="mt-1 text-sm text-mute">{p.name}</p>
            <p className="mt-3 text-sm leading-relaxed text-mute">{p.scope}</p>
            <p className={`mt-5 text-2xl font-black ${p.featured ? 'text-gold' : ''}`}>
              {p.price}
            </p>
            <p className="mt-1 text-sm text-mute">{p.priceNote}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-lg border border-line bg-card p-6">
        <h3 className="text-sm font-bold text-mute">すべてのキットに含まれるもの</h3>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {included.map((item) => (
            <li key={item} className="flex gap-2 text-sm">
              <span aria-hidden="true" className="mt-0.5 shrink-0 text-gold">
                ◆
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
