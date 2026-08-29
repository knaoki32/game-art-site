import Section from '../components/Section'

const rows = [
  { label: '契約の単位', typical: '案件単位', mine: 'キャラクター単位' },
  { label: '対応範囲', typical: '画像単位', mine: '画像・漫画・動画を横断' },
  { label: '納品後', typical: '制作後に終了', mine: 'DLC・LiveOpsまで継続' },
  { label: '制作条件', typical: '条件を毎回作り直す', mine: '基準画像と制作条件を保管' },
]

/**
 * 単発の画像制作とキャラクター運用の違い。
 * 競合を下げるのではなく、サービス内容の違いを説明する対比。
 */
export default function Comparison() {
  return (
    <Section
      id="difference"
      kicker="キャラクター運用という考え方"
      title="単発の画像制作ではなく、キャラクター運用を支援します。"
      lead="単発のイラスト制作と、キャラクター運用の支援では、提供する内容が異なります。当方がお引き受けするのは、キャラクターを軸にした継続的な制作です。"
    >
      {/* デスクトップ: 対比テーブル */}
      <div className="hidden overflow-hidden rounded-lg border border-line md:block">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-card">
              <th scope="col" className="w-40 p-4 text-left text-sm font-bold text-mute">
                比較項目
              </th>
              <th scope="col" className="p-4 text-left font-bold text-mute">
                単発の画像制作
              </th>
              <th
                scope="col"
                className="border-l-2 border-gold bg-card-2 p-4 text-left font-black"
              >
                キャラクター運用
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-t border-line">
                <th scope="row" className="p-4 text-left text-sm font-bold text-mute">
                  {row.label}
                </th>
                <td className="p-4 text-mute">{row.typical}</td>
                <td className="border-l-2 border-gold bg-card-2 p-4 font-bold">
                  {row.mine}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* モバイル: 対比カード */}
      <div className="space-y-3 md:hidden">
        {rows.map((row) => (
          <div key={row.label} className="rounded-lg border border-line bg-card p-4">
            <h3 className="text-sm font-bold text-mute">{row.label}</h3>
            <div className="mt-2 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-sm text-mute">単発の画像制作</p>
                <p className="mt-0.5 text-mute">{row.typical}</p>
              </div>
              <div className="border-l-2 border-gold pl-3">
                <p className="text-sm text-gold">キャラクター運用</p>
                <p className="mt-0.5 font-bold">{row.mine}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
