import Section from '../components/Section'

const steps = [
  {
    title: '基準画像',
    desc: 'キャラクターの「基準になる1枚」を制作・提出し、絵柄を合意してから量産に入ります。',
  },
  {
    title: 'プロンプト設計',
    desc: '専用ツールでプロンプトを設計し、キャラクターごとに保管します。',
  },
  {
    title: '参照生成',
    desc: '基準画像を参照して生成。立ち絵・差分・動画すべてが同じ基準から派生します。',
  },
  {
    title: '人手修正',
    desc: '生成物を基準画像と照合し、崩れは人の手でレタッチ・修正します。',
  },
  {
    title: '保管',
    desc: '基準画像+制作条件を資産として保管。時間が空いた追加制作でも、同じ条件から再開しやすくします。',
  },
]

/**
 * 制作工程。「AI画像を生成して終わり」ではなく「再現可能な制作工程」を図解する。
 * 基準画像 → プロンプト設計 → 参照生成 → 人手修正 → 保管 の5ステップ。
 */
export default function Process() {
  return (
    <Section
      id="process"
      kicker="Reproducible Workflow"
      title="「なぜ崩れないのか」を、工程で説明します。"
      lead="生成して終わり、ではありません。基準画像とプロンプトを資産として管理する、再現可能な制作工程です。ヒアリング(NDA締結可)で世界観と既存素材を確認したうえで、次の5工程で進みます。"
      tinted
    >
      {/* 工程フロー図 */}
      <ol className="grid gap-3 md:grid-cols-5 md:gap-0" aria-label="制作工程の5ステップ">
        {steps.map((step, i) => (
          <li key={step.title} className="flex items-stretch md:flex-col">
            <div className="flex flex-1 flex-col rounded-lg border border-line bg-card p-5">
              <span className="text-xs font-black tracking-widest text-gold">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-1.5 text-base font-black">{step.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-mute">{step.desc}</p>
            </div>
            {i < steps.length - 1 && (
              <span
                aria-hidden="true"
                className="flex items-center justify-center px-1 text-gold md:h-6 md:rotate-90"
              >
                ↓
              </span>
            )}
          </li>
        ))}
      </ol>

      {/* 参照生成からの枝分かれ: 横断の裏づけ */}
      <div className="mt-8 rounded-lg border border-line bg-card p-6 sm:p-8">
        <h3 className="text-sm font-bold">
          1枚の基準画像から、すべての媒体へ
        </h3>
        <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-4">
          <span className="rounded border border-gold-fill/50 bg-ink px-4 py-2 text-sm font-bold text-gold-fill">
            基準画像
          </span>
          <span aria-hidden="true" className="text-mute">
            →
          </span>
          <div className="flex flex-wrap justify-center gap-2">
            {['立ち絵', '表情差分', '衣装差分', 'イベントCG', 'ストア素材', '動画'].map(
              (m) => (
                <span
                  key={m}
                  className="rounded border border-line bg-card-2 px-3 py-2 text-xs"
                >
                  {m}
                </span>
              ),
            )}
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-mute">
          画像も動画も同じ基準画像を参照して制作するため、媒体をまたいでも同じキャラクターのまま展開しやすい工程です。
        </p>
      </div>

      {/* 人手修正の明示。
          もともとは修正前後の比較画像を並べていたが、提示できる実素材が揃わないため
          画像枠を外して文言だけのパネルにした(2026-08-06)。
          工程04と対になる主張なので、文言自体は残している。
          実素材が用意できたら images.ts の processBefore / processAfter に src を入れ、
          ここに比較画像を戻す。 */}
      <div className="mt-8 rounded-lg border border-line bg-card p-6 sm:p-8">
        <h3 className="text-sm font-bold">全納品物に、人の手が入ります</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-mute">
          生成物は必ず基準画像と照合し、指先・髪の流れ・衣装のディテールまで人手で修正してから納品します。
          「生成したまま」の画像を納品することはありません。
        </p>
      </div>
    </Section>
  )
}
