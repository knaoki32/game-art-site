import { useState } from 'react'
import { nav, site } from '../content/site'

export default function Header() {
  const [open, setOpen] = useState(false)

  // 地は不透明。半透明+ぼかし(ガラス調)はAIの定番の型で、地色も1種増えるためやめている
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-baseline gap-2">
          <span className="text-lg font-black tracking-wide">{site.brand}</span>
          {/* 1024px未満ではナビが折れるので肩書きを畳む */}
          <span className="hidden text-sm tracking-widest text-mute lg:inline">
            {site.brandTagline}
          </span>
        </a>

        <nav aria-label="メイン" className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-mute transition-colors hover:text-body"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-md bg-gold-fill px-4 py-2 text-sm font-bold text-ink transition-colors hover:bg-gold-soft"
          >
            相談する
          </a>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md md:hidden"
          aria-expanded={open}
          aria-label={open ? 'メニューを閉じる' : 'メニューを開く'}
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav
          aria-label="メイン(モバイル)"
          className="border-t border-line bg-paper px-5 pb-4 md:hidden"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block border-b border-line/50 py-3 text-sm text-body"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="mt-4 block rounded-md bg-gold-fill px-4 py-3 text-center text-sm font-bold text-ink"
            onClick={() => setOpen(false)}
          >
            制作について相談する
          </a>
        </nav>
      )}
    </header>
  )
}
