import Placeholder from '../components/Placeholder'
import CtaButton from '../components/CtaButton'
import { images } from '../content/images'

const trustChips = ['NDA対応', '商用利用可', '日本語 / English', '再現可能な制作工程']

/**
 * ファーストビュー。
 * 文章より先にビジュアルで伝える: 同一キャラクターが 7 媒体に展開されるグリッドが主役。
 * 数字(枚数・速度・価格)はここには一切置かない。
 */
export default function Hero() {
  return (
    <section id="top" className="px-5 pt-12 pb-16 sm:px-8 md:pt-20 md:pb-24">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-[5fr_7fr] lg:gap-14">
          {/* 左: 最小限のコピー */}
          <div>
            {/* 宛先を頭に置く。「何が」だけでなく「誰向けか」を最初の画面で言う */}
            <p className="text-sm font-bold tracking-[0.2em] text-gold">
              ゲーム会社向け・キャラクター一貫性・DLC展開キット
            </p>
            <h1 className="mt-4 text-3xl font-black leading-tight sm:text-4xl md:text-[2.75rem]">
              同じキャラクターを、
              <br />
              立ち絵から動画まで、
              <br />
              <span className="text-gold">崩さない。</span>
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-mute sm:text-base">
              {/* 和文は連結して書く。JSXの改行はスペース1個になり、日本語では字間が空いて見えるため */}
              {'立ち絵・表情差分・衣装差分・DLC・Steamカプセル・SNS・動画まで、' +
                '一貫した姿のまま展開する制作パートナーです。'}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <CtaButton href="#contact">制作について相談する</CtaButton>
              <CtaButton href="#proof" variant="ghost">
                109ページの証明を見る
              </CtaButton>
            </div>
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="対応体制">
              {trustChips.map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-line px-3 py-1 text-sm text-mute"
                >
                  {chip}
                </li>
              ))}
            </ul>
          </div>

          {/* 右: 同一キャラクター展開グリッド(FVの主役) */}
          <div aria-label="同一キャラクターの媒体展開例">
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {/* 基本立ち絵: 2行ぶち抜きで基準であることを示す */}
              <Placeholder
                slot={images.heroKey}
                badge="基準"
                priority
                className="row-span-2 min-h-[240px] sm:min-h-[300px]"
              />
              <Placeholder slot={images.heroExpressions} priority className="aspect-[4/3]" />
              <Placeholder slot={images.heroCostume} priority className="aspect-[4/3]" />
              <Placeholder slot={images.heroDlc} priority className="aspect-[4/3]" />
              <Placeholder slot={images.heroCapsule} className="aspect-[460/215]" />
              <Placeholder slot={images.heroSns} priority className="aspect-video" />
              <Placeholder
                slot={images.heroVideo}
                priority
                className="aspect-video sm:aspect-[4/3]"
              />
            </div>
            <p className="mt-3 text-center text-sm text-mute">
              — すべて<span className="font-bold text-body">同じ1体のキャラクター</span>
              から展開 —
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
