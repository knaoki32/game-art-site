import Section from '../components/Section'
import CtaButton from '../components/CtaButton'

interface Product {
  name: string
  nameJa: string
  featured?: boolean
  desc: string
  items: string[]
  forWho: string
}

const products: Product[] = [
  {
    name: 'Character Continuity & DLC Kit',
    nameJa: 'キャラクター一貫性・DLC展開キット',
    featured: true,
    desc: '既にお持ちのキャラクターの絵柄に合わせ込み、衣装差分・表情差分・追加立ち絵・イベントCGをDLC単位で制作します。基準画像と制作条件を構築・保管するため、時間が空いた次のDLCでも一貫性を再現しやすい状態を保てます。',
    items: [
      '既存絵柄への合わせ込み検証(サンプル提出 → 合意後に本制作)',
      '衣装差分 × 立ち絵・表情差分の一式',
      'イベントCG・スチル',
      'ストア・SNS用の規格別書き出し',
      '基準画像+制作条件の構築・保管(次回DLCで再利用)',
    ],
    forWho:
      'DLC・衣装差分・追加キャラクターを計画しているスタジオ。外注で「顔が変わった」経験があるチーム。',
  },
  {
    name: 'Steam Launch Visual Kit',
    nameJa: 'Steamローンチ・ビジュアルキット',
    desc: 'ストア公開に必要なビジュアル一式を、キャラクター一貫性を保ったまま制作します。ヘッダー・メイン・ライブラリの各カプセル、OGP・SNS告知画像、PV用カットインまで。',
    items: [
      'Steamカプセル一式(ヘッダー / メイン / ライブラリ縦型)',
      'OGP・SNS告知画像(16:9)',
      'PV・トレーラー用カットイン素材',
      '各規格のセーフエリアを考慮した書き出し',
    ],
    forWho: 'ストアページ公開・ローンチを控えたタイトル。ビジュアルの統一感を整えたいチーム。',
  },
  {
    name: 'LiveOps Community Creative Pack',
    nameJa: 'LiveOps・コミュニティ素材パック(月次)',
    desc: 'リリース後の運用フェーズを月次契約で支えます。シーズンイベント絵・SNS投稿素材・アップデート告知素材を、同じキャラクターのまま継続供給します。',
    items: [
      'シーズン・イベント用イラスト',
      'SNS投稿素材・アップデート告知画像',
      '月次の点数レンジ制+優先対応枠',
      '基準画像・制作条件の継続メンテナンス',
    ],
    forWho: 'アップデートを続けるタイトル。SNS運用・コミュニティ施策を回すチーム。',
  },
]

export default function Products() {
  return (
    <Section
      id="products"
      kicker="Services"
      title="商品は3つ。キャラクターの展開と運用に絞っています。"
      lead="いずれも「検証サンプルの提出 → 絵柄の合意 → 本制作」の順で進みます。画像・漫画・動画を横断でき、日本語・英語どちらでも対応します。"
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {products.map((p) => (
          <article
            key={p.name}
            className={`flex flex-col rounded-xl border p-6 sm:p-7 ${
              p.featured
                ? 'border-gold bg-card shadow-[0_0_40px_rgba(201,162,74,0.08)] lg:-my-3 lg:py-10'
                : 'border-line bg-card/60'
            }`}
          >
            {p.featured && (
              <p className="mb-3 inline-flex w-fit rounded bg-gold-fill px-2 py-0.5 text-[11px] font-bold text-ink">
                主力商品
              </p>
            )}
            <h3 className="text-lg font-black leading-snug">{p.name}</h3>
            <p className="mt-1 text-xs text-mute">{p.nameJa}</p>
            <p className="mt-4 text-sm leading-relaxed text-mute">{p.desc}</p>
            <h4 className="mt-5 text-xs font-bold tracking-wide text-mute">
              含まれるもの
            </h4>
            <ul className="mt-2 space-y-1.5">
              {p.items.map((item) => (
                <li key={item} className="flex gap-2 text-sm">
                  <span aria-hidden="true" className="mt-0.5 shrink-0 text-gold">
                    ◆
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-5 rounded-md bg-card-2 p-3">
              <h4 className="text-xs font-bold text-mute">こんなチームに</h4>
              <p className="mt-1 text-xs leading-relaxed text-mute">{p.forWho}</p>
            </div>
            {p.featured && (
              <CtaButton href="#contact" className="mt-6">
                このキットについて相談する
              </CtaButton>
            )}
          </article>
        ))}
      </div>
    </Section>
  )
}
