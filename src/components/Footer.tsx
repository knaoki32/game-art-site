import { nav, site } from '../content/site'

export default function Footer() {
  return (
    <footer className="border-t border-line px-5 py-12 sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
        <div>
          <p className="text-base font-black">{site.brand}</p>
          <p className="mt-1 text-sm text-mute">
            ゲーム会社のキャラクター運用を支える制作パートナー
          </p>
        </div>
        <nav aria-label="フッター" className="flex flex-wrap gap-x-6 gap-y-2">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-mute transition-colors hover:text-body"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
      <p className="mx-auto mt-10 w-full max-w-6xl text-sm text-mute">
        © {new Date().getFullYear()} {site.brand}. All rights reserved.
      </p>
    </footer>
  )
}
