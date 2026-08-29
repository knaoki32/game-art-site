import { Fragment } from 'react'

interface Props {
  /** 「。」区切りの本文。1〜2文ごとに改行を入れて表示する */
  text: string
  /** 1つの段落に入れる文の数の上限(既定2) */
  per?: number
  /**
   * 1つの段落の字数の上限(既定89)。
   * 文の数だけで切ると「2文で108字」のような塊が残り、狭い幅では5〜6行の壁になる。
   * 89字は幅768px以上での3行ぶんの目安。
   */
  maxChars?: number
  className?: string
}

/**
 * 和文の長い本文を、切れ目なく積ませないための表示部品。
 *
 * 2文以上・90字以上が改行なしで4行以上続くと、狭い幅では文字の壁になって読まれない。
 * ここでは文言を1字も変えず、句点のあとに <br /> を入れて段落の切れ目だけを作る。
 * 箇条書き(<li>)の中では <p> ではなく改行で切ること(点の頭と本文がずれるため)。
 */
export default function Paragraphs({
  text,
  per = 2,
  maxChars = 89,
  className = '',
}: Props) {
  // 「。」で切って句点は残す。末尾の空要素は捨てる
  const sentences = text.split(/(?<=。)/).filter((s) => s.length > 0)

  // 文の数と字数の両方が上限に収まる範囲で、貪欲に1段へ詰める
  const blocks: string[] = []
  let cur = ''
  let count = 0
  for (const s of sentences) {
    const wouldOverflow = cur !== '' && (count >= per || cur.length + s.length > maxChars)
    if (wouldOverflow) {
      blocks.push(cur)
      cur = ''
      count = 0
    }
    cur += s
    count += 1
  }
  if (cur) blocks.push(cur)

  return (
    <p className={className}>
      {blocks.map((b, i) => (
        <Fragment key={b}>
          {i > 0 && <br />}
          {b}
        </Fragment>
      ))}
    </p>
  )
}
