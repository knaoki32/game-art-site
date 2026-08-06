import Section from '../components/Section'
import Placeholder from '../components/Placeholder'
import { images } from '../content/images'

const maintained = [
  '顔立ち',
  '体型',
  '髪の流れ',
  '瞳のハイライト',
  '衣装のディテール',
  '塗りのタッチ',
]

/**
 * 109ページ漫画 = キャラクター一貫性を証明する最大の証拠。
 * 「実績」ではなく「耐久試験の合格証」として、FV直後に配置する。
 */
export default function Proof() {
  return (
    <Section
      id="proof"
      kicker="Proof — 109 Pages"
      title="109ページ。同じキャラクターを最後まで維持。"
      lead={
        <>
          {/* 和文は連結して書く。JSXの改行はスペース1個になり、日本語では字間が空いて見えるため */}
          {'フルカラー漫画(全109ページ)を企画から作画まで一人で完結。' +
            '序盤・中盤・終盤 — どのページを開いても、同じ顔・同じ体型・同じ塗りです。' +
            'これは1枚のイラストでは証明できない、長期運用の耐久試験です。'}
        </>
      }
      tinted
    >
      {/* 離れたページ同士の比較 */}
      <div className="grid grid-cols-3 gap-3 sm:gap-5">
        <Placeholder slot={images.proofPageEarly} badge="P.7" className="aspect-[3/4]" />
        <Placeholder slot={images.proofPageMid} badge="P.39" className="aspect-[3/4]" />
        <Placeholder slot={images.proofPageLate} badge="P.100" className="aspect-[3/4]" />
      </div>
      <p className="mt-3 text-center text-xs text-mute">
        90ページ以上離れた場面でも、同一人物であることが一目で分かります。
      </p>

      {/* 表情比較・衣装比較 */}
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <div>
          <h3 className="mb-3 text-sm font-bold">表情が変わっても</h3>
          <Placeholder slot={images.proofExpressions} className="aspect-[16/7]" />
        </div>
        <div>
          <h3 className="mb-3 text-sm font-bold">衣装が変わっても</h3>
          <Placeholder slot={images.proofCostumes} className="aspect-[16/7]" />
        </div>
      </div>

      {/* 維持している要素 */}
      <div className="mt-10 rounded-lg border border-line bg-card p-6 sm:p-8">
        <h3 className="text-sm font-bold text-mute">109ページ維持し続けたもの</h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {maintained.map((item) => (
            <li
              key={item}
              className="rounded border border-line bg-card-2 px-3 py-1.5 text-sm"
            >
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-base font-bold leading-relaxed sm:text-lg">
          この109ページを支えた工程で、
          <span className="text-gold">貴社キャラクターのDLC・継続制作に取り組みます。</span>
        </p>
      </div>
    </Section>
  )
}
