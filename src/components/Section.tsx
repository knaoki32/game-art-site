import type { ReactNode } from 'react'

interface Props {
  id: string
  /** 英語キッカー(小さく金色で表示) */
  kicker: string
  /** 日本語見出し */
  title: string
  /** リード文 */
  lead?: ReactNode
  children: ReactNode
  /** 背景をわずかに変える(交互配色用) */
  tinted?: boolean
}

export default function Section({ id, kicker, title, lead, children, tinted = false }: Props) {
  return (
    <section
      id={id}
      className={`scroll-mt-16 px-5 py-20 sm:px-8 md:py-28 ${tinted ? 'bg-card/40' : ''}`}
    >
      <div className="mx-auto w-full max-w-6xl">
        <p className="text-xs font-bold tracking-[0.25em] text-gold uppercase">{kicker}</p>
        <h2 className="mt-3 text-2xl font-black leading-snug sm:text-3xl md:text-4xl">
          {title}
        </h2>
        {/* リード文は幅を絞らず、コンテナ(max-w-6xl)いっぱいに流す */}
        {lead && (
          <p className="mt-5 text-sm leading-relaxed text-mute sm:text-base">{lead}</p>
        )}
        <div className="mt-10 md:mt-14">{children}</div>
      </div>
    </section>
  )
}
