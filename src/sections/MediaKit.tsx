import Section from '../components/Section'
import Placeholder from '../components/Placeholder'
import { images } from '../content/images'

/**
 * Steamカプセル・SNS・動画への展開。
 * Steam の実規格(比率をそのまま再現)で見せることで、業界理解を示す。
 */
export default function MediaKit() {
  return (
    <Section
      id="media"
      kicker="Store, SNS & Video"
      title="ストアページからSNSまで、同じ顔で。"
      lead="ゲーム内素材だけでは終わりません。Steamストアの各規格・SNS告知・動画まで、同じキャラクターのまま書き出します。媒体ごとに絵柄がブレることはありません。"
      tinted
    >
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Steam規格モック */}
        <div>
          <h3 className="mb-1.5 text-sm font-bold text-mute">
            Steam ストア規格(実寸比率)
          </h3>
          <p className="mb-4 text-[11px] text-mute">
            同じ1体のキャラクターを、3規格それぞれの構図で書き出した例
          </p>
          <div className="grid grid-cols-[2fr_1fr] gap-4">
            <div className="flex flex-col gap-4">
              <div>
                <Placeholder
                  slot={images.mediaCapsuleHeader}
                  className="aspect-[460/215]"
                />
                <p className="mt-1.5 text-[11px] text-mute">ヘッダーカプセル 460×215</p>
              </div>
              <div>
                <Placeholder
                  slot={images.mediaCapsuleMain}
                  className="aspect-[616/353]"
                />
                <p className="mt-1.5 text-[11px] text-mute">メインカプセル 616×353</p>
              </div>
            </div>
            <div>
              <Placeholder
                slot={images.mediaCapsuleLibrary}
                className="aspect-[600/900]"
              />
              <p className="mt-1.5 text-[11px] text-mute">ライブラリ縦型 600×900</p>
            </div>
          </div>
        </div>

        {/* SNS・動画 */}
        <div>
          <h3 className="mb-4 text-sm font-bold text-mute">SNS・動画</h3>
          <div className="grid grid-cols-[2fr_1fr] gap-4">
            <div>
              <Placeholder slot={images.mediaOgp} className="aspect-video" />
              <p className="mt-1.5 text-[11px] text-mute">
                X / OGP 告知画像 16:9
              </p>
            </div>
            <div>
              <Placeholder slot={images.mediaVideo} className="aspect-[9/16]" />
              <p className="mt-1.5 text-[11px] text-mute">縦型動画 9:16</p>
            </div>
          </div>
        </div>
      </div>

      {/* この3項目はSteam規格とSNS・動画の両方にかかる説明なので、
          2列グリッドの外に出して横幅いっぱいに置く。
          右列(SNS・動画)の中に入れていた頃は、右半分だけに閉じ込められたうえ
          左列の内容より下から始まって、どこにも揃っていない見た目になっていた。 */}
      <ul className="mt-10 space-y-2 text-sm text-mute">
        {[
          '画像・漫画・動画を同じ基準画像から制作 — 媒体をまたいでも同じキャラクター',
          '各媒体の規格(サイズ・セーフエリア)に合わせて書き出し',
          'ローンチからアップデート告知まで、時期をまたいでも一貫性を保ちやすい工程で継続制作',
        ].map((item) => (
          <li key={item} className="flex gap-2">
            <span aria-hidden="true" className="mt-0.5 shrink-0 text-gold">
              ◆
            </span>
            {item}
          </li>
        ))}
      </ul>
    </Section>
  )
}
