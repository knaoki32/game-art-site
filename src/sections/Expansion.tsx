import Section from '../components/Section'
import Placeholder from '../components/Placeholder'
import { images } from '../content/images'

/**
 * キャラクター展開実例。
 * ベースキャラ1体 → DLC・季節・追加キャラ・イベントCG の4方向に展開する図。
 */
export default function Expansion() {
  return (
    <Section
      id="expansion"
      kicker="キャラクターの展開"
      title="1体のキャラクターを、長く運用できる資産に。"
      lead="既にお持ちのキャラクターが出発点です。基準画像を確立したあとは、DLC衣装・季節イベント・追加キャラクター・イベントCGへ、同じ姿のまま展開できます。"
    >
      <div className="grid gap-5 lg:grid-cols-[4fr_8fr]">
        {/* ベースキャラクター */}
        <div className="flex flex-col">
          <Placeholder
            slot={images.expansionBase}
            badge="ベース"
            className="min-h-[280px] flex-1 lg:min-h-[360px]"
          />
          <p className="mt-3 text-sm text-mute">
            貴社の既存キャラクター(または新規基準画像)
          </p>
        </div>

        {/* 4方向の展開 */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            {
              slot: images.expansionDlcPack,
              title: 'DLC衣装パック',
              desc: '3衣装 × 立ち絵+差分。追加販売の単位ごとに一式で。',
            },
            {
              slot: images.expansionSeasonal,
              title: '季節イベント衣装',
              desc: '夏・ハロウィン・正月。シーズンごとの施策に。',
            },
            {
              slot: images.expansionNewChar,
              title: '追加キャラクター',
              desc: '同じ画風・同じ塗りで、世界観を保ったまま増やす。',
            },
            {
              slot: images.expansionEventCg,
              title: 'イベントCG / スチル',
              desc: 'ストーリー演出・実績解除・特典用の一枚絵。',
            },
          ].map((item) => (
            <div key={item.title} className="flex flex-col">
              <Placeholder slot={item.slot} className="aspect-[4/3]" />
              <h3 className="mt-3 text-sm font-bold">{item.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-mute">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 rounded-lg border border-gold/30 bg-card p-6 text-center sm:p-8">
        <p className="text-base font-bold">
          基準画像と制作条件を、キャラクターごとに保管します。
        </p>
        <p className="mt-2 text-sm text-mute">
          時間が空いた追加制作でも、一貫性を再現しやすい工程を整えています。
          <a href="#process" className="ml-1 text-gold underline-offset-4 hover:underline">
            制作工程を見る →
          </a>
        </p>
      </div>
    </Section>
  )
}
