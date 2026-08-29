import type { ReactNode } from 'react'

interface Props {
  href: string
  children: ReactNode
  /**
   * primary = 金の塗り(1画面に1つまで)
   * ghost   = 文中リンクの見た目。塗りボタンを2つ並べると「どちらを押せばいいか」が
   *           消えるため、2つ目は必ずこちらに落とす
   */
  variant?: 'primary' | 'ghost'
  external?: boolean
  className?: string
}

export default function CtaButton({
  href,
  children,
  variant = 'primary',
  external = false,
  className = '',
}: Props) {
  const styles =
    variant === 'primary'
      ? 'inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-bold transition-colors bg-gold-fill text-ink hover:bg-gold-soft'
      : 'inline-flex items-center justify-center gap-2 px-1 py-3 text-sm font-bold transition-colors text-mute underline underline-offset-4 hover:text-gold'
  return (
    <a
      href={href}
      className={`${styles} ${className}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}
