import type { ImageSlot } from '../content/images'

interface Props {
  slot: ImageSlot
  /** アスペクト比・角丸などは呼び出し側から Tailwind クラスで指定する */
  className?: string
  /** 帯ラベル(例: ページ番号バッジ) */
  badge?: string
  /** ファーストビューなど LCP 対象の画像は true(eager + fetchpriority=high) */
  priority?: boolean
}

/**
 * 画像スロット。src があれば <img>、なければ差し替え前提のプレースホルダーを表示する。
 * プレースホルダーにも role="img" + aria-label を付け、読み上げ環境で意味が通るようにする。
 */
export default function Placeholder({ slot, className = '', badge, priority = false }: Props) {
  return (
    <figure className={`relative overflow-hidden rounded-lg ${className}`}>
      {slot.src ? (
        <img
          src={slot.src}
          alt={slot.alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          className="h-full w-full object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={`${slot.alt}(画像準備中)`}
          className="flex h-full w-full flex-col items-center justify-center gap-1.5 border border-dashed border-line bg-card px-3 py-6 text-center"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-6 w-6 text-mute/50"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.5-3.5L9 20" />
          </svg>
          <span className="text-xs font-medium text-mute">{slot.label}</span>
          {slot.spec && (
            <span className="text-[10px] text-mute/60">{slot.spec}</span>
          )}
        </div>
      )}
      {badge && (
        <span className="absolute top-2 left-2 rounded bg-ink/85 px-2 py-0.5 text-[11px] font-bold tracking-wide text-gold-fill">
          {badge}
        </span>
      )}
    </figure>
  )
}
