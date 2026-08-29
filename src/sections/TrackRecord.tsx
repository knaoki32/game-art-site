import Section from '../components/Section'

const records = [
  {
    stat: '109ページ',
    title: 'フルカラー漫画を完結',
    desc: '企画・作画を一人で担当。同一キャラクターを最終ページまで維持。',
  },
  {
    stat: '12.6万人',
    title: 'YouTubeチャンネルの画像制作を継続担当',
    desc: '登録者12.6万人のチャンネルに、継続的に画像を供給。',
  },
  {
    stat: '1位',
    title: 'イラスト投稿サイト ランキング',
    desc: '投稿作品がランキング1位を獲得。',
  },
  {
    stat: '110本+',
    title: '制作工程の研究記事を公開',
    desc: '制作工程の研究をnoteで継続的に発信。工程を公開できることは、再現可能な制作体制の裏づけです。',
  },
  {
    stat: '2018年〜',
    title: 'クラウドソーシングでの受託実績',
    desc: '守秘義務のある案件は内容を伏せて対応(実績掲載は許諾制)。',
  },
]

export default function TrackRecord() {
  return (
    <Section
      id="record"
      kicker="これまでの実績"
      title="単発ではなく、続けてきた実績。"
      lead="規模の数字より、継続して任され続けていることを見てください。"
      tinted
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {records.map((r) => (
          <div key={r.title} className="rounded-lg border border-line bg-card p-5">
            <p className="text-2xl font-black text-gold">{r.stat}</p>
            <h3 className="mt-2 text-sm font-bold leading-snug">{r.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-mute">{r.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
