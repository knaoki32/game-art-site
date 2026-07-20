import type { ReactNode } from 'react'

interface Props {
  href: string
  children: ReactNode
  /** primary = 金色(1画面に1つまで) / ghost = 枠線のみ */
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
  const base =
    'inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-bold transition-colors'
  const styles =
    variant === 'primary'
      ? 'bg-gold text-ink hover:bg-gold-soft'
      : 'border border-line text-body hover:border-gold hover:text-gold'
  return (
    <a
      href={href}
      className={`${base} ${styles} ${className}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}
