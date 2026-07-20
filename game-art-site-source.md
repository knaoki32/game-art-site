# knao — Character Art Partner 営業サイト(実装済みソース一式)

Steam・インディーゲーム会社向け営業サイトの完全なソースコード。
このファイル1つで、他のAI・開発者が実装の続き(画像差し替え・文言調整・機能追加)を行えます。

- 目的: **Character Continuity & DLC Kit** の問い合わせ獲得(ポートフォリオではなく営業サイト)
- 提案の軸: 「AI画像制作サービス」ではなく、ゲーム会社向けの「キャラクター運用パートナー」
- スタック: React 19 + TypeScript + Tailwind CSS v4 + Vite(GitHub Pages 向け静的サイト)
- プロジェクト場所: `C:\Users\Admin\product\game-art-site`
- セクション順(営業ストーリー): 価値提案 → 109ページ証明 → 展開実例 → Steam/SNS/動画 → 商品 → 制作工程 → 比較(単発の画像制作 vs キャラクター運用) → 実績 → 料金 → FAQ・方針 → 問い合わせ
- デザイン: ダーク基調(#111217)+金アクセント(#C9A24A)、作品画像が主役、UI最小限
- 画像は全24スロットを `src/content/images.ts` で一元管理。`src` 未設定はプレースホルダー表示

## 画像の現状(2026-07-20 更新)

- 使用中の実画像: 基準画像(heroKey / expansionBase = haruka_reference)、漫画ページ比較3枚(P.7=manga_multi / P.39=manga_infographic / 終盤=manga_hakama)、表情比較(manga_angles)
- **Lovartで再生成待ちの12枠**: heroExpressions / heroCostume / heroDlc / heroSns / heroVideo / proofCostumes / expansionDlcPack / expansionSeasonal / expansionNewChar / expansionEventCg / mediaOgp / mediaVideo — 生成仕様は `lovart-generation-specs.md` 参照(haruka_reference をキャラクター参照に、表示枠と同じ比率で生成)
- 恒久プレースホルダー: Steamカプセル4枠、人手修正の前後比較2枠(実素材ができたら差し替え)

## 残タスク(公開前)

1. Lovartで12枚を再生成(`lovart-generation-specs.md` の指示書どおり)→ `public/images/` に保存 → `images.ts` に `src` 設定
2. 問い合わせフォームURL — `src/content/site.ts` の `contactFormUrl`(現在 `https://forms.gle/REPLACE_ME`)
3. OGP画像 — `public/ogp.png` を用意し `index.html` に `og:image` 追加
4. GitHubへ push → Settings → Pages → Source を「GitHub Actions」に(deploy.yml 済み)

## コピーライティングの規約(変更時も維持すること)

- 使わない表現: 「40枚/日」「最短翌日」「3万円〜」「AI画像制作代行」「無料相談」(CTAでの「無料」)、「最強」「最高品質」「絶対」等の誇張
- 品質の断定をしない: 「半年後も同じ品質」ではなく「基準画像と制作条件を保管し、時間が空いた追加制作でも一貫性を再現しやすい工程」と表現する
- 競合を下げない: 比較は「単発の画像制作」と「キャラクター運用」というサービス内容の違いとして書く
- 増やすキーワード: キャラクター一貫性 / 制作工程 / 長期運用 / Steam / DLC / LiveOps / 継続制作
- 料金は参考価格を明示: DLC Kit 22万円〜 / Steam Kit 30万円〜 / LiveOps 月額24万円〜(変動する旨を併記)
- ComfyUIは使用していないため記載しない。工程は「基準画像→プロンプト設計→参照生成→人手修正→保管」(実際の運用)
- ページ番号は制作者確認済みのもののみ使用(P.7 / P.39。終盤のページ番号は未確認のため「終盤」表記)
- トーン: ゲーム会社へ提案書を出すような落ち着いた文体

---

# ソースコード

## `package.json`

````json
{
  "name": "game-art-site",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "oxlint",
    "preview": "vite preview"
  },
  "dependencies": {
    "@tailwindcss/vite": "^4.3.3",
    "react": "^19.2.7",
    "react-dom": "^19.2.7",
    "tailwindcss": "^4.3.3"
  },
  "devDependencies": {
    "@types/node": "^24.13.2",
    "@types/react": "^19.2.17",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.3",
    "oxlint": "^1.71.0",
    "typescript": "~6.0.2",
    "vite": "^8.1.1"
  }
}
````

## `vite.config.ts`

````ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base: './' — GitHub Pages のサブパス(https://<user>.github.io/<repo>/)配下でも動く相対パス出力
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
````

## `index.html`

````html
<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>キャラクター一貫性×DLC展開｜ゲーム向けキャラクターアート制作パートナー knao</title>
    <meta
      name="description"
      content="同じキャラクターを立ち絵・表情差分・衣装差分・DLC・Steamカプセル・SNS・動画まで一貫して展開。109ページのフルカラー漫画で実証したキャラクター一貫性を、貴社タイトルのDLC・LiveOps運用に。NDA対応・日英対応。"
    />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Character Continuity & DLC Kit｜knao" />
    <meta
      property="og:description"
      content="同じキャラクターを、立ち絵から動画まで、崩さない。ゲーム会社のキャラクター運用を支える制作パートナー。"
    />
    <meta property="og:locale" content="ja_JP" />
    <meta property="og:locale:alternate" content="en_US" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@knaoki23" />
    <meta name="theme-color" content="#111217" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&display=swap"
    />
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "knao — Character Art Partner",
        "description": "ゲーム会社向けキャラクターアート制作。キャラクター一貫性を維持した立ち絵・差分・DLC・Steamストア素材・SNS・動画の展開。",
        "areaServed": "Worldwide",
        "availableLanguage": ["Japanese", "English"],
        "sameAs": ["https://x.com/knaoki23"]
      }
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
````

## `src/index.css`

````css
@import "tailwindcss";

@theme {
  /* ブランドパレット: ダーク基調 + 金アクセント(構成案 v3 準拠) */
  --color-ink: #111217; /* 背景 */
  --color-card: #1b1d24; /* カード面 */
  --color-card-2: #22242e; /* カード面(明) */
  --color-line: #2c2f3a; /* 罫線 */
  --color-body: #e8e6e1; /* 本文(温白) */
  --color-mute: #8b8e9a; /* 補助テキスト */
  --color-gold: #c9a24a; /* アクセント(CTA・強調のみ) */
  --color-gold-soft: #e3c37a;

  --font-sans: "Noto Sans JP", system-ui, -apple-system, "Segoe UI", sans-serif;
}

html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}

body {
  background-color: var(--color-ink);
  color: var(--color-body);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}

::selection {
  background: rgba(201, 162, 74, 0.35);
}

/* キーボードフォーカスの可視化(アクセシビリティ) */
:focus-visible {
  outline: 2px solid var(--color-gold);
  outline-offset: 2px;
  border-radius: 2px;
}
````

## `src/main.tsx`

````tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
````

## `src/App.tsx`

````tsx
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import Proof from './sections/Proof'
import Expansion from './sections/Expansion'
import MediaKit from './sections/MediaKit'
import Products from './sections/Products'
import Process from './sections/Process'
import Comparison from './sections/Comparison'
import TrackRecord from './sections/TrackRecord'
import Pricing from './sections/Pricing'
import Policy from './sections/Policy'
import Contact from './sections/Contact'

/**
 * ページ構成(営業ストーリー順):
 * 価値提案 → 109ページ証明 → 展開実例 → Steam/SNS/動画 → 商品 → 工程 → 比較 → 実績 → 料金 → FAQ/方針 → 問い合わせ
 */
export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Proof />
        <Expansion />
        <MediaKit />
        <Products />
        <Process />
        <Comparison />
        <TrackRecord />
        <Pricing />
        <Policy />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
````

## `src/content/site.ts`

````ts
/**
 * サイト全体で使う定数(リンク・名乗り)。
 * 問い合わせ先の URL はここだけ書き換えれば全 CTA に反映される。
 */

export const site = {
  brand: 'knao',
  brandTagline: 'Character Art Partner',
  /** 問い合わせ用 Google フォーム URL(要差し替え) */
  contactFormUrl: 'https://forms.gle/REPLACE_ME',
  /** X (Twitter) プロフィール */
  xUrl: 'https://x.com/knaoki23',
  xHandle: '@knaoki23',
} as const

export const nav = [
  { href: '#proof', label: '一貫性の証明' },
  { href: '#expansion', label: '展開実例' },
  { href: '#products', label: '商品' },
  { href: '#process', label: '制作工程' },
  { href: '#pricing', label: '料金' },
  { href: '#policy', label: '方針・FAQ' },
] as const
````

## `src/content/images.ts`

````ts
/**
 * 画像レジストリ — サイト内の全画像スロットをここで一元管理する。
 *
 * 差し替え方法:
 *   1. 画像を public/images/ に置く(例: public/images/hero-key.webp)
 *   2. 該当スロットの src に "images/hero-key.webp" を設定する
 *   src が undefined の間は、その場所にプレースホルダーが表示される。
 *
 * alt は「同一キャラクターであること」が伝わる具体的な文にする(SEO・アクセシビリティ)。
 *
 * 現在の画像はポートフォリオ(portfolio/assets)由来。
 * Steamカプセル4枠と修正前/後の2枠は、該当する実素材ができるまでプレースホルダーのまま。
 */

export interface ImageSlot {
  /** 画像パス(public/ 基準の相対パス)。未設定ならプレースホルダー表示 */
  src?: string
  /** 代替テキスト(具体的に) */
  alt: string
  /** プレースホルダーに表示するラベル */
  label: string
  /** 推奨サイズ・規格などのメモ(プレースホルダーに小さく表示) */
  spec?: string
}

export const images = {
  /* ── 1. ファーストビュー: 同一キャラクター展開グリッド ── */
  heroKey: {
    src: 'images/haruka_reference.jpg',
    alt: '同一キャラクター「はるか」の基本立ち絵(制服・正面)。基準画像',
    label: '基本立ち絵',
    spec: '縦長 2:3 推奨',
  },
  heroExpressions: {
    alt: '同一キャラクターの表情差分シート(複数の表情のバストアップ)',
    label: '表情差分',
    spec: '横長 4:3(Lovartで再生成予定)',
  },
  heroCostume: {
    alt: '同一キャラクターの衣装差分(私服姿の立ち絵)',
    label: '衣装差分',
    spec: '横長 4:3(Lovartで再生成予定)',
  },
  heroDlc: {
    alt: '同一キャラクターのDLC想定の特別衣装立ち絵',
    label: 'DLC衣装',
    spec: '横長 4:3(Lovartで再生成予定)',
  },
  heroCapsule: {
    alt: '同一キャラクターを使用したSteamカプセル画像',
    label: 'Steamカプセル',
    spec: '460×215',
  },
  heroSns: {
    alt: '同一キャラクターを使用したSNS告知画像',
    label: 'SNS画像',
    spec: '16:9(Lovartで再生成予定)',
  },
  heroVideo: {
    alt: '同一キャラクターの動画サムネイル',
    label: '動画',
    spec: '4:3(Lovartで再生成予定)',
  },

  /* ── 2. 109ページの証明 ── */
  proofPageEarly: {
    src: 'images/manga_multi.jpg',
    alt: 'フルカラー漫画 P.7(グループワークの場面)。ヒロインの顔立ちと体型',
    label: 'P.7 の場面',
    spec: '縦長 3:4',
  },
  proofPageMid: {
    src: 'images/manga_infographic.jpg',
    alt: 'フルカラー漫画 P.39(モノクロ演出の場面)。同一ヒロインを別トーンで描いても顔立ちが同じ',
    label: 'P.39 の場面',
    spec: '縦長 3:4',
  },
  proofPageLate: {
    src: 'images/manga_hakama.jpg',
    alt: 'フルカラー漫画・終盤の場面(袴姿)。同一ヒロインの顔立ち・体型・塗りが序盤と同じ',
    label: '終盤の場面',
    spec: '縦長 3:4',
  },
  proofExpressions: {
    src: 'images/manga_angles.jpg',
    alt: '同一キャラクターの表情・アングル比較(お辞儀・むくれ顔・横顔)',
    label: '表情比較シート',
    spec: '横長 16:7',
  },
  proofCostumes: {
    alt: '同一キャラクターの衣装比較シート(複数の衣装を同じポーズで並べたもの)',
    label: '衣装比較シート',
    spec: '横長 16:7(Lovartで再生成予定)',
  },

  /* ── 3. キャラクター展開実例 ── */
  expansionBase: {
    src: 'images/haruka_reference.jpg',
    alt: 'ベースキャラクターの基本立ち絵(基準画像と同一)',
    label: 'ベースキャラクター(基本立ち絵)',
    spec: '縦長 2:3',
  },
  expansionDlcPack: {
    alt: '同一キャラクターのDLC衣装パック(3衣装の立ち絵を横並びにしたシート)',
    label: 'DLC衣装パック(3衣装)',
    spec: '横長 4:3(Lovartで再生成予定)',
  },
  expansionSeasonal: {
    alt: '同一キャラクターの季節イベント衣装(夏・ハロウィン・正月)',
    label: '季節イベント衣装',
    spec: '横長 4:3(Lovartで再生成予定)',
  },
  expansionNewChar: {
    alt: '同じ画風・同じ塗りで描いた追加キャラクター',
    label: '追加キャラクター(同じ画風)',
    spec: '横長 4:3(Lovartで再生成予定)',
  },
  expansionEventCg: {
    alt: '同一キャラクターのイベントCG・スチル',
    label: 'イベントCG / スチル',
    spec: '横長 4:3(Lovartで再生成予定)',
  },

  /* ── 4. Steam・SNS・動画への展開 ── */
  mediaCapsuleHeader: {
    alt: 'Steamヘッダーカプセル(460×215)のモックアップ',
    label: 'ヘッダーカプセル',
    spec: '460×215',
  },
  mediaCapsuleMain: {
    alt: 'Steamメインカプセル(616×353)のモックアップ',
    label: 'メインカプセル',
    spec: '616×353',
  },
  mediaCapsuleLibrary: {
    alt: 'Steamライブラリ縦型カプセル(600×900)のモックアップ',
    label: 'ライブラリ縦型',
    spec: '600×900',
  },
  mediaOgp: {
    alt: 'SNS・OGP向けの16:9告知イメージ(同一キャラクター)',
    label: 'SNS / OGP 告知画像',
    spec: '16:9(Lovartで再生成予定)',
  },
  mediaVideo: {
    alt: '同一キャラクターの縦型動画(9:16)サムネイル',
    label: '縦型動画',
    spec: '9:16(Lovartで再生成予定)',
  },

  /* ── 6. 制作工程 ── */
  processBefore: {
    alt: '人手修正前の生成画像(細部に崩れがある状態)',
    label: '修正前',
    spec: '4:3',
  },
  processAfter: {
    alt: '人手修正後の完成画像(基準画像と一致した状態)',
    label: '修正後',
    spec: '4:3',
  },
} as const satisfies Record<string, ImageSlot>

export type ImageKey = keyof typeof images
````

## `src/components/Header.tsx`

````tsx
import { useState } from 'react'
import { nav, site } from '../content/site'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/90 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-baseline gap-2">
          <span className="text-lg font-black tracking-wide">{site.brand}</span>
          <span className="hidden text-[11px] tracking-widest text-mute sm:inline">
            {site.brandTagline}
          </span>
        </a>

        <nav aria-label="メイン" className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs text-mute transition-colors hover:text-body"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-md bg-gold px-4 py-2 text-xs font-bold text-ink transition-colors hover:bg-gold-soft"
          >
            相談する
          </a>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded md:hidden"
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
          className="border-t border-line bg-ink px-5 pb-4 md:hidden"
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
            className="mt-4 block rounded-md bg-gold px-4 py-3 text-center text-sm font-bold text-ink"
            onClick={() => setOpen(false)}
          >
            制作について相談する
          </a>
        </nav>
      )}
    </header>
  )
}
````

## `src/components/Footer.tsx`

````tsx
import { nav, site } from '../content/site'

export default function Footer() {
  return (
    <footer className="border-t border-line px-5 py-12 sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
        <div>
          <p className="text-lg font-black">{site.brand}</p>
          <p className="mt-1 text-xs text-mute">
            ゲーム会社のキャラクター運用を支える制作パートナー
          </p>
        </div>
        <nav aria-label="フッター" className="flex flex-wrap gap-x-6 gap-y-2">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs text-mute transition-colors hover:text-body"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
      <p className="mx-auto mt-10 w-full max-w-6xl text-[11px] text-mute/60">
        © {new Date().getFullYear()} {site.brand}. All rights reserved.
      </p>
    </footer>
  )
}
````

## `src/components/Section.tsx`

````tsx
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
        {lead && (
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-mute sm:text-base">{lead}</p>
        )}
        <div className="mt-10 md:mt-14">{children}</div>
      </div>
    </section>
  )
}
````

## `src/components/Placeholder.tsx`

````tsx
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
        <span className="absolute top-2 left-2 rounded bg-ink/85 px-2 py-0.5 text-[11px] font-bold tracking-wide text-gold">
          {badge}
        </span>
      )}
    </figure>
  )
}
````

## `src/components/CtaButton.tsx`

````tsx
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
````

## `src/sections/Hero.tsx`

````tsx
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
            <p className="text-xs font-bold tracking-[0.25em] text-gold uppercase">
              Character Continuity & DLC Kit
            </p>
            <h1 className="mt-4 text-3xl font-black leading-tight sm:text-4xl md:text-[2.75rem]">
              同じキャラクターを、
              <br />
              立ち絵から動画まで、
              <br />
              <span className="text-gold">崩さない。</span>
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-mute sm:text-base">
              立ち絵・表情差分・衣装差分・DLC・Steamカプセル・SNS・動画まで、
              一貫した姿のまま展開する制作パートナーです。
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
                  className="rounded-full border border-line px-3 py-1 text-[11px] text-mute"
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
            <p className="mt-3 text-center text-xs text-mute">
              — すべて<span className="font-bold text-body">同じ1体のキャラクター</span>
              から展開 —
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
````

## `src/sections/Proof.tsx`

````tsx
import Section from '../components/Section'
import Placeholder from '../components/Placeholder'
import { images } from '../content/images'

const maintained = [
  '顔立ち',
  '体型',
  '髪の流れ',
  '瞳のハイライト',
  '衣装のディテール',
  '塗りのタッチ',
]

/**
 * 109ページ漫画 = キャラクター一貫性を証明する最大の証拠。
 * 「実績」ではなく「耐久試験の合格証」として、FV直後に配置する。
 */
export default function Proof() {
  return (
    <Section
      id="proof"
      kicker="Proof — 109 Pages"
      title="109ページ。同じキャラクターを最後まで維持。"
      lead={
        <>
          フルカラー漫画(全109ページ)を企画から作画まで一人で完結。
          序盤・中盤・終盤 — どのページを開いても、同じ顔・同じ体型・同じ塗りです。
          これは1枚のイラストでは証明できない、長期運用の耐久試験です。
        </>
      }
      tinted
    >
      {/* 離れたページ同士の比較 */}
      <div className="grid grid-cols-3 gap-3 sm:gap-5">
        <Placeholder slot={images.proofPageEarly} badge="P.7" className="aspect-[3/4]" />
        <Placeholder slot={images.proofPageMid} badge="P.39" className="aspect-[3/4]" />
        <Placeholder slot={images.proofPageLate} badge="終盤" className="aspect-[3/4]" />
      </div>
      <p className="mt-3 text-center text-xs text-mute">
        物語の序盤・中盤・終盤 — 場面もトーンも変わっても、同一人物であることが一目で分かります。
      </p>

      {/* 表情比較・衣装比較 */}
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <div>
          <h3 className="mb-3 text-sm font-bold">表情が変わっても</h3>
          <Placeholder slot={images.proofExpressions} className="aspect-[16/7]" />
        </div>
        <div>
          <h3 className="mb-3 text-sm font-bold">衣装が変わっても</h3>
          <Placeholder slot={images.proofCostumes} className="aspect-[16/7]" />
        </div>
      </div>

      {/* 維持している要素 */}
      <div className="mt-10 rounded-lg border border-line bg-card p-6 sm:p-8">
        <h3 className="text-sm font-bold text-mute">109ページ維持し続けたもの</h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {maintained.map((item) => (
            <li
              key={item}
              className="rounded border border-line bg-card-2 px-3 py-1.5 text-sm"
            >
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-base font-bold leading-relaxed sm:text-lg">
          この109ページを支えた工程で、
          <span className="text-gold">貴社キャラクターのDLC・継続制作に取り組みます。</span>
        </p>
      </div>
    </Section>
  )
}
````

## `src/sections/Expansion.tsx`

````tsx
import Section from '../components/Section'
import Placeholder from '../components/Placeholder'
import { images } from '../content/images'

/**
 * キャラクター展開実例。
 * ベースキャラ1体 → DLC・季節・追加キャラ・イベントCG の4方向に展開する図。
 */
export default function Expansion() {
  return (
    <Section
      id="expansion"
      kicker="Character Expansion"
      title="1体のキャラクターを、長く運用できる資産に。"
      lead="既にお持ちのキャラクターが出発点です。基準画像を確立したあとは、DLC衣装・季節イベント・追加キャラクター・イベントCGへ、同じ姿のまま展開できます。"
    >
      <div className="grid gap-5 lg:grid-cols-[4fr_8fr]">
        {/* ベースキャラクター */}
        <div className="flex flex-col">
          <Placeholder
            slot={images.expansionBase}
            badge="ベース"
            className="min-h-[280px] flex-1 lg:min-h-[360px]"
          />
          <p className="mt-3 text-xs text-mute">
            貴社の既存キャラクター(または新規基準画像)
          </p>
        </div>

        {/* 4方向の展開 */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            {
              slot: images.expansionDlcPack,
              title: 'DLC衣装パック',
              desc: '3衣装 × 立ち絵+差分。追加販売の単位ごとに一式で。',
            },
            {
              slot: images.expansionSeasonal,
              title: '季節イベント衣装',
              desc: '夏・ハロウィン・正月。シーズンごとの施策に。',
            },
            {
              slot: images.expansionNewChar,
              title: '追加キャラクター',
              desc: '同じ画風・同じ塗りで、世界観を保ったまま増やす。',
            },
            {
              slot: images.expansionEventCg,
              title: 'イベントCG / スチル',
              desc: 'ストーリー演出・実績解除・特典用の一枚絵。',
            },
          ].map((item) => (
            <div key={item.title} className="flex flex-col">
              <Placeholder slot={item.slot} className="aspect-[4/3]" />
              <h3 className="mt-3 text-sm font-bold">{item.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-mute">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 rounded-lg border border-gold/30 bg-card p-6 text-center sm:p-8">
        <p className="text-base font-bold sm:text-lg">
          基準画像と制作条件を、キャラクターごとに保管します。
        </p>
        <p className="mt-2 text-sm text-mute">
          時間が空いた追加制作でも、一貫性を再現しやすい工程を整えています。
          <a href="#process" className="ml-1 text-gold underline-offset-4 hover:underline">
            制作工程を見る →
          </a>
        </p>
      </div>
    </Section>
  )
}
````

## `src/sections/MediaKit.tsx`

````tsx
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
          <h3 className="mb-4 text-sm font-bold text-mute">
            Steam ストア規格(実寸比率)
          </h3>
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
          <ul className="mt-6 space-y-2 text-sm text-mute">
            <li className="flex gap-2">
              <span aria-hidden="true" className="text-gold">
                ◆
              </span>
              画像・漫画・動画を同じ基準画像から制作 — 媒体をまたいでも同じキャラクター
            </li>
            <li className="flex gap-2">
              <span aria-hidden="true" className="text-gold">
                ◆
              </span>
              各媒体の規格(サイズ・セーフエリア)に合わせて書き出し
            </li>
            <li className="flex gap-2">
              <span aria-hidden="true" className="text-gold">
                ◆
              </span>
              ローンチからアップデート告知まで、時期をまたいでも一貫性を保ちやすい工程で継続制作
            </li>
          </ul>
        </div>
      </div>
    </Section>
  )
}
````

## `src/sections/Products.tsx`

````tsx
import Section from '../components/Section'
import CtaButton from '../components/CtaButton'

interface Product {
  name: string
  nameJa: string
  featured?: boolean
  desc: string
  items: string[]
  forWho: string
}

const products: Product[] = [
  {
    name: 'Character Continuity & DLC Kit',
    nameJa: 'キャラクター一貫性・DLC展開キット',
    featured: true,
    desc: '既にお持ちのキャラクターの絵柄に合わせ込み、衣装差分・表情差分・追加立ち絵・イベントCGをDLC単位で制作します。基準画像と制作条件を構築・保管するため、時間が空いた次のDLCでも一貫性を再現しやすい状態を保てます。',
    items: [
      '既存絵柄への合わせ込み検証(サンプル提出 → 合意後に本制作)',
      '衣装差分 × 立ち絵・表情差分の一式',
      'イベントCG・スチル',
      'ストア・SNS用の規格別書き出し',
      '基準画像+制作条件の構築・保管(次回DLCで再利用)',
    ],
    forWho:
      'DLC・衣装差分・追加キャラクターを計画しているスタジオ。外注で「顔が変わった」経験があるチーム。',
  },
  {
    name: 'Steam Launch Visual Kit',
    nameJa: 'Steamローンチ・ビジュアルキット',
    desc: 'ストア公開に必要なビジュアル一式を、キャラクター一貫性を保ったまま制作します。ヘッダー・メイン・ライブラリの各カプセル、OGP・SNS告知画像、PV用カットインまで。',
    items: [
      'Steamカプセル一式(ヘッダー / メイン / ライブラリ縦型)',
      'OGP・SNS告知画像(16:9)',
      'PV・トレーラー用カットイン素材',
      '各規格のセーフエリアを考慮した書き出し',
    ],
    forWho: 'ストアページ公開・ローンチを控えたタイトル。ビジュアルの統一感を整えたいチーム。',
  },
  {
    name: 'LiveOps Community Creative Pack',
    nameJa: 'LiveOps・コミュニティ素材パック(月次)',
    desc: 'リリース後の運用フェーズを月次契約で支えます。シーズンイベント絵・SNS投稿素材・アップデート告知素材を、同じキャラクターのまま継続供給します。',
    items: [
      'シーズン・イベント用イラスト',
      'SNS投稿素材・アップデート告知画像',
      '月次の点数レンジ制+優先対応枠',
      '基準画像・制作条件の継続メンテナンス',
    ],
    forWho: 'アップデートを続けるタイトル。SNS運用・コミュニティ施策を回すチーム。',
  },
]

export default function Products() {
  return (
    <Section
      id="products"
      kicker="Services"
      title="商品は3つ。キャラクターの展開と運用に絞っています。"
      lead="いずれも「検証サンプルの提出 → 絵柄の合意 → 本制作」の順で進みます。画像・漫画・動画を横断でき、日本語・英語どちらでも対応します。"
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {products.map((p) => (
          <article
            key={p.name}
            className={`flex flex-col rounded-xl border p-6 sm:p-7 ${
              p.featured
                ? 'border-gold bg-card shadow-[0_0_40px_rgba(201,162,74,0.08)] lg:-my-3 lg:py-10'
                : 'border-line bg-card/60'
            }`}
          >
            {p.featured && (
              <p className="mb-3 inline-flex w-fit rounded bg-gold px-2 py-0.5 text-[11px] font-bold text-ink">
                主力商品
              </p>
            )}
            <h3 className="text-lg font-black leading-snug">{p.name}</h3>
            <p className="mt-1 text-xs text-mute">{p.nameJa}</p>
            <p className="mt-4 text-sm leading-relaxed text-mute">{p.desc}</p>
            <h4 className="mt-5 text-xs font-bold tracking-wide text-mute">
              含まれるもの
            </h4>
            <ul className="mt-2 space-y-1.5">
              {p.items.map((item) => (
                <li key={item} className="flex gap-2 text-sm">
                  <span aria-hidden="true" className="mt-0.5 shrink-0 text-gold">
                    ◆
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-5 rounded-md bg-ink/60 p-3">
              <h4 className="text-xs font-bold text-mute">こんなチームに</h4>
              <p className="mt-1 text-xs leading-relaxed text-mute">{p.forWho}</p>
            </div>
            {p.featured && (
              <CtaButton href="#contact" className="mt-6">
                このキットについて相談する
              </CtaButton>
            )}
          </article>
        ))}
      </div>
    </Section>
  )
}
````

## `src/sections/Process.tsx`

````tsx
import Section from '../components/Section'
import Placeholder from '../components/Placeholder'
import { images } from '../content/images'

const steps = [
  {
    title: '基準画像',
    desc: 'キャラクターの「基準になる1枚」を制作・提出し、絵柄を合意してから量産に入ります。',
  },
  {
    title: 'プロンプト設計',
    desc: '専用ツールでプロンプトを設計し、キャラクターごとに保管します。',
  },
  {
    title: '参照生成',
    desc: '基準画像を参照して生成。立ち絵・差分・動画すべてが同じ基準から派生します。',
  },
  {
    title: '人手修正',
    desc: '生成物を基準画像と照合し、崩れは人の手でレタッチ・修正します。',
  },
  {
    title: '保管',
    desc: '基準画像+制作条件を資産として保管。時間が空いた追加制作でも、同じ条件から再開しやすくします。',
  },
]

/**
 * 制作工程。「AI画像を生成して終わり」ではなく「再現可能な制作工程」を図解する。
 * 基準画像 → プロンプト設計 → 参照生成 → 人手修正 → 保管 の5ステップ。
 */
export default function Process() {
  return (
    <Section
      id="process"
      kicker="Reproducible Workflow"
      title="「なぜ崩れないのか」を、工程で説明します。"
      lead="生成して終わり、ではありません。基準画像とプロンプトを資産として管理する、再現可能な制作工程です。ヒアリング(NDA締結可)で世界観と既存素材を確認したうえで、次の5工程で進みます。"
      tinted
    >
      {/* 工程フロー図 */}
      <ol className="grid gap-3 md:grid-cols-5 md:gap-0" aria-label="制作工程の5ステップ">
        {steps.map((step, i) => (
          <li key={step.title} className="flex items-stretch md:flex-col">
            <div className="flex flex-1 flex-col rounded-lg border border-line bg-card p-5">
              <span className="text-xs font-black tracking-widest text-gold">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-1.5 text-base font-black">{step.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-mute">{step.desc}</p>
            </div>
            {i < steps.length - 1 && (
              <span
                aria-hidden="true"
                className="flex items-center justify-center px-1 text-gold md:h-6 md:rotate-90"
              >
                ↓
              </span>
            )}
          </li>
        ))}
      </ol>

      {/* 参照生成からの枝分かれ: 横断の裏づけ */}
      <div className="mt-8 rounded-lg border border-line bg-card p-6 sm:p-8">
        <h3 className="text-sm font-bold">
          1枚の基準画像から、すべての媒体へ
        </h3>
        <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-4">
          <span className="rounded border border-gold/50 bg-ink px-4 py-2 text-sm font-bold text-gold">
            基準画像
          </span>
          <span aria-hidden="true" className="text-mute">
            →
          </span>
          <div className="flex flex-wrap justify-center gap-2">
            {['立ち絵', '表情差分', '衣装差分', 'イベントCG', 'ストア素材', '動画'].map(
              (m) => (
                <span
                  key={m}
                  className="rounded border border-line bg-card-2 px-3 py-2 text-xs"
                >
                  {m}
                </span>
              ),
            )}
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-mute">
          画像も動画も同じ基準画像を参照して制作するため、媒体をまたいでも同じキャラクターのまま展開しやすい工程です。
        </p>
      </div>

      {/* 人手修正の証拠(1組のみ) */}
      <div className="mt-8 grid gap-5 md:grid-cols-[1fr_1fr_1.2fr] md:items-center">
        <Placeholder slot={images.processBefore} badge="修正前" className="aspect-[4/3]" />
        <Placeholder slot={images.processAfter} badge="修正後" className="aspect-[4/3]" />
        <div>
          <h3 className="text-sm font-bold">全納品物に、人の手が入ります</h3>
          <p className="mt-2 text-sm leading-relaxed text-mute">
            生成物は必ず基準画像と照合し、指先・髪の流れ・衣装のディテールまで人手で修正してから納品します。
            「生成したまま」の画像を納品することはありません。
          </p>
        </div>
      </div>
    </Section>
  )
}
````

## `src/sections/Comparison.tsx`

````tsx
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
      kicker="Character Operations"
      title="単発の画像制作ではなく、キャラクター運用を支援します。"
      lead="単発のイラスト制作と、キャラクター運用の支援では、提供する内容が異なります。当方がお引き受けするのは、キャラクターを軸にした継続的な制作です。"
    >
      {/* デスクトップ: 対比テーブル */}
      <div className="hidden overflow-hidden rounded-xl border border-line md:block">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-card">
              <th scope="col" className="w-40 p-4 text-left text-xs font-bold text-mute">
                比較項目
              </th>
              <th scope="col" className="p-4 text-left font-bold text-mute">
                単発の画像制作
              </th>
              <th
                scope="col"
                className="border-l-2 border-gold bg-card-2 p-4 text-left font-black text-gold"
              >
                キャラクター運用
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-t border-line">
                <th scope="row" className="p-4 text-left text-xs font-bold text-mute">
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
            <h3 className="text-xs font-bold text-mute">{row.label}</h3>
            <div className="mt-2 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-[10px] text-mute/70">単発の画像制作</p>
                <p className="mt-0.5 text-mute">{row.typical}</p>
              </div>
              <div className="border-l-2 border-gold pl-3">
                <p className="text-[10px] text-gold">キャラクター運用</p>
                <p className="mt-0.5 font-bold">{row.mine}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
````

## `src/sections/TrackRecord.tsx`

````tsx
import Section from '../components/Section'

const records = [
  {
    stat: '109ページ',
    title: 'フルカラー漫画を完結',
    desc: '企画・作画を一人で担当。同一キャラクターを最終ページまで維持。',
  },
  {
    stat: '12.6万人',
    title: 'YouTubeチャンネルの画像制作を継続担当',
    desc: '登録者12.6万人のチャンネルに、継続的に画像を供給。',
  },
  {
    stat: '1位',
    title: 'イラスト投稿サイト ランキング',
    desc: '投稿作品がランキング1位を獲得。',
  },
  {
    stat: '110本+',
    title: '制作工程の研究記事を公開',
    desc: '制作工程の研究をnoteで継続的に発信。工程を公開できることは、再現可能な制作体制の裏づけです。',
  },
  {
    stat: '2018年〜',
    title: 'クラウドソーシングでの受託実績',
    desc: '守秘義務のある案件は内容を伏せて対応(実績掲載は許諾制)。',
  },
]

export default function TrackRecord() {
  return (
    <Section
      id="record"
      kicker="Track Record"
      title="単発ではなく、続けてきた実績。"
      lead="規模の数字より、継続して任され続けていることを見てください。"
      tinted
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {records.map((r) => (
          <div key={r.title} className="rounded-lg border border-line bg-card p-5">
            <p className="text-2xl font-black text-gold">{r.stat}</p>
            <h3 className="mt-2 text-sm font-bold leading-snug">{r.title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-mute">{r.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
````

## `src/sections/Pricing.tsx`

````tsx
import Section from '../components/Section'

const plans = [
  {
    name: 'Character Continuity & DLC Kit',
    featured: true,
    scope: '衣装3種 × 立ち絵・差分一式+ストア用書き出し、基準画像・制作条件の構築を含む',
    price: '22万円〜',
    priceNote: '参考価格。衣装数・点数により変動します',
  },
  {
    name: 'Steam Launch Visual Kit',
    scope: 'カプセル一式(3規格)+OGP・SNS告知画像+PV用カットイン',
    price: '30万円〜',
    priceNote: '参考価格。素材の範囲により変動します',
  },
  {
    name: 'LiveOps Community Creative Pack',
    scope: '月次の点数レンジ制。イベント絵・SNS素材・告知素材を継続供給',
    price: '月額24万円〜',
    priceNote: '参考価格。月間の点数レンジにより変動します',
  },
]

const included = [
  '一貫性検証サンプル(本制作前に絵柄を確認)',
  '修正対応(回数は契約時に明記)',
  '商用利用権',
  '各媒体規格での書き出し',
]

/**
 * 料金目安。1枚あたり単価は出さない(単発の画像業者の値付けに見えるため)。
 * パック=プロジェクト規模の予算枠として提示する。
 */
export default function Pricing() {
  return (
    <Section
      id="pricing"
      kicker="Pricing"
      title="料金の目安。キット単位の参考価格です。"
      lead="以下は参考価格です。点数・規模・運用期間によって変動するため、正式なお見積りは内容を伺ったうえでご提案します。お見積り・ご相談は無料です。"
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`rounded-xl border p-6 sm:p-7 ${
              p.featured ? 'border-gold bg-card' : 'border-line bg-card/60'
            }`}
          >
            <h3 className="text-base font-black leading-snug">{p.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-mute">{p.scope}</p>
            <p className={`mt-5 text-2xl font-black ${p.featured ? 'text-gold' : ''}`}>
              {p.price}
            </p>
            <p className="mt-1 text-xs text-mute">{p.priceNote}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-lg border border-line bg-card p-6">
        <h3 className="text-sm font-bold text-mute">すべてのキットに含まれるもの</h3>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {included.map((item) => (
            <li key={item} className="flex gap-2 text-sm">
              <span aria-hidden="true" className="mt-0.5 shrink-0 text-gold">
                ◆
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
````

## `src/sections/Policy.tsx`

````tsx
import Section from '../components/Section'

const policies = [
  {
    title: '秘密保持(NDA)',
    body: 'NDA締結に対応します。未発表タイトル・企画段階の情報も安全に共有いただけます。実績としての掲載は、事前の許諾をいただいた場合のみ行います。',
  },
  {
    title: '商用利用・権利',
    body: '納品物は商用利用いただけます。利用範囲・二次利用の条件は契約時に書面で明文化します。貴社からお預かりした素材(既存キャラクター・設定資料)は、目的外利用・学習利用をしません。',
  },
  {
    title: 'AI利用の方針',
    body: '制作工程に生成AIを使用します(隠しません)。商用利用可能なツール・プランのみを使用し、基準画像とプロンプトで工程を記録・再現します。全納品物に人手の修正・仕上げを行い、第三者の著作物を意図的に模倣することはありません。',
  },
]

const faqs = [
  {
    q: '既存キャラクターの絵柄に合わせられますか?',
    a: '本制作の前に「基準になる1枚」を制作・提出し、絵柄をご確認いただきます。合意後に量産へ進むため、イメージと違うものが大量に納品されるリスクがありません。',
  },
  {
    q: 'SteamのAI利用開示(AI Generated Content Disclosure)には対応できますか?',
    a: '対応します。ストア申告に必要な工程情報(AI利用の範囲・人手工程の内容)を提供できます。',
  },
  {
    q: '納品後、時間が空いてからの追加発注はできますか?',
    a: 'できます。基準画像と制作条件をキャラクターごとに保管しているため、時間が空いた追加発注でも一貫性を再現しやすい工程で対応します。',
  },
  {
    q: '修正には対応してもらえますか?',
    a: '対応します。修正回数・範囲は契約時に明記します。',
  },
  {
    q: '英語でのやり取りは可能ですか?',
    a: '可能です。Inquiries and project communication in English are welcome.',
  },
  {
    q: '漫画や動画もお願いできますか?',
    a: '可能です。同じ基準画像から画像・漫画・動画を横断して制作できます(フルカラー漫画109ページの完結実績があります)。',
  },
]

export default function Policy() {
  return (
    <Section
      id="policy"
      kicker="Policy & FAQ"
      title="安心して発注いただくために。"
      lead="権利・秘密保持・AI利用について、契約前に確認されることを先にすべて開示します。"
      tinted
    >
      <div className="grid gap-5 md:grid-cols-3">
        {policies.map((p) => (
          <div key={p.title} className="rounded-lg border border-line bg-card p-6">
            <h3 className="text-sm font-black">{p.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-mute">{p.body}</p>
          </div>
        ))}
      </div>

      <h3 className="mt-12 text-lg font-black">よくある質問</h3>
      <div className="mt-4 divide-y divide-line rounded-lg border border-line bg-card">
        {faqs.map((f) => (
          <details key={f.q} className="group px-6 py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold [&::-webkit-details-marker]:hidden">
              {f.q}
              <span
                aria-hidden="true"
                className="shrink-0 text-gold transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-mute">{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
  )
}
````

## `src/sections/Contact.tsx`

````tsx
import CtaButton from '../components/CtaButton'
import { site } from '../content/site'

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-16 px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto w-full max-w-3xl text-center">
        <p className="text-xs font-bold tracking-[0.25em] text-gold uppercase">Contact</p>
        <h2 className="mt-3 text-2xl font-black leading-snug sm:text-3xl md:text-4xl">
          キャラクターの展開、ご相談ください。
        </h2>
        <p className="mt-5 text-sm leading-relaxed text-mute sm:text-base">
          「この絵柄を維持できるか?」の検証サンプルからでも、キャラクター資料を共有してのご相談からでも構いません。
          お見積り・ご相談は無料です。
          <br />
          <span lang="en">Inquiries in English are welcome.</span>
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <CtaButton href={site.contactFormUrl} external className="w-full sm:w-auto">
            プロジェクトについて相談する
          </CtaButton>
          <CtaButton href={site.xUrl} external variant="ghost" className="w-full sm:w-auto">
            X のDMで相談 {site.xHandle}
          </CtaButton>
        </div>
        <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-mute">
          <li>2営業日以内に返信します</li>
          <li>NDA締結後の資料共有に対応</li>
          <li>日本語 / English</li>
        </ul>
      </div>
    </section>
  )
}
````

## `lovart-generation-specs.md`

````markdown
# Lovart 再生成指示書(12枚)

すべて `haruka_reference.jpg`(制服・ツインテール・緑目・ピンクリボンの基準画像)を**キャラクター参照としてアップロード**したうえで生成する。
表示枠に合わせたアスペクト比で生成すること(トリミング前提にしない)。

共通の参照指示(全プロンプト冒頭に付ける):
> 添付の基準画像と同じキャラクター(茶髪ツインテール・緑の瞳・ピンクのリボン・同じ顔立ち・同じ塗り)で、

完成後は `public/images/` に下記ファイル名で保存し、`src/content/images.ts` の該当スロットに `src: 'images/ファイル名'` を設定する。

---

## ファーストビュー(5枚)

### 1. hero-expressions.jpg — 表情差分シート
- 比率: **4:3**(推奨 1600×1200)
- 内容: 同じキャラクターのバストアップ表情差分を2×2〜2×3のグリッドで(笑顔・驚き・怒り・照れ・悲しみ・通常)。背景は無地(薄いグレー)。ゲームの表情差分シート風。
- スロット: `heroExpressions`

### 2. hero-costume.jpg — 衣装差分
- 比率: **4:3**(推奨 1600×1200)
- 内容: 私服(カジュアル)姿の立ち絵。膝上〜全身。背景は無地またはごく薄いグラデーション。制服(基準)との衣装差分であることが分かるように。
- スロット: `heroCostume`

### 3. hero-dlc.jpg — DLC衣装
- 比率: **4:3**(推奨 1600×1200)
- 内容: DLCらしい特別衣装(ファンタジー風ドレス or 和装など、豪華め)の立ち絵。背景無地。
- スロット: `heroDlc`

### 4. hero-sns.jpg — SNS画像
- 比率: **16:9**(推奨 1920×1080)
- 内容: SNS告知風の横長ビジュアル。キャラクターを右または左に寄せ、反対側にテキストを載せられる余白を残す。背景はシーン(街・海など)。
- スロット: `heroSns`

### 5. hero-video.jpg — 動画サムネイル
- 比率: **4:3**(推奨 1600×1200)
- 内容: 動画のサムネイル風。キャラクターが手を振る・話しかけるような動きのあるポーズ。
- スロット: `heroVideo`

## 109ページの証明(1枚)

### 6. proof-costumes.jpg — 衣装比較シート
- 比率: **16:7**(推奨 1600×700)
- 内容: 同じキャラクター・同じポーズ・同じ顔で、衣装だけ違う立ち絵を3〜4体横に並べたシート(制服/私服/水着や浴衣など)。背景無地。「衣装が変わっても顔・体型が同じ」が一目で分かること。
- スロット: `proofCostumes`

## キャラクター展開実例(4枚)

### 7. expansion-dlc-pack.jpg — DLC衣装パック(3衣装)
- 比率: **4:3**(推奨 1600×1200)
- 内容: 3種類の衣装の立ち絵を横並びで1枚に(例: ドレス/メイド服/冒険者装備)。DLC商品ページのプレビュー風。背景無地。
- スロット: `expansionDlcPack`

### 8. expansion-seasonal.jpg — 季節イベント衣装
- 比率: **4:3**(推奨 1600×1200)
- 内容: 夏(浴衣 or 水着)・ハロウィン(魔女)・正月(晴れ着)の3衣装を横並びで1枚に。背景無地。
- スロット: `expansionSeasonal`

### 9. expansion-new-char.jpg — 追加キャラクター
- 比率: **4:3**(推奨 1600×1200)
- 内容: **基準画像とは別のキャラクター**(髪色・髪型・目の色を変える。例: 黒髪ロング・青目)を、同じ画風・同じ塗りで描いた立ち絵。「別キャラでも画風が揃う」ことを示す。
- スロット: `expansionNewChar`

### 10. expansion-event-cg.jpg — イベントCG / スチル
- 比率: **4:3**(推奨 1600×1200)
- 内容: シーン込みの一枚絵(夕暮れの教室・海辺など)。ゲームのイベントCG風の構図。
- スロット: `expansionEventCg`

## Steam・SNS・動画への展開(2枚)

### 11. media-ogp.jpg — SNS / OGP 告知画像
- 比率: **16:9**(推奨 1920×1080)
- 内容: OGP・X告知用。キャラクター+タイトルを載せる余白。hero-sns.jpg と構図を変える(こちらはアップデート告知風)。
- スロット: `mediaOgp`

### 12. media-video.jpg — 縦型動画サムネイル
- 比率: **9:16**(推奨 1080×1920)
- 内容: 縦型ショート動画のサムネイル風。全身または膝上。上下に余白を作らず9:16いっぱいに描く(レターボックス禁止)。
- スロット: `mediaVideo`

---

## 生成しない枠(現状のまま)

- Steamカプセル4枠(heroCapsule / mediaCapsuleHeader / mediaCapsuleMain / mediaCapsuleLibrary)
- 人手修正の前後比較2枠(processBefore / processAfter)
- 漫画ページ比較3枠(P.7=manga_multi / P.39=manga_infographic / 終盤=manga_hakama)
- 表情比較シート(manga_angles)
- 基準画像2枠(heroKey / expansionBase = haruka_reference)
````

## `public/images/README.md`

````markdown
# 画像の差し替え方法

このフォルダに本番画像を置き、`src/content/images.ts` の該当スロットに `src` を設定してください。

例: ファーストビューの基本立ち絵を差し替える場合

1. `public/images/hero-key.webp` を置く
2. `src/content/images.ts` の `heroKey` を編集:

```ts
heroKey: {
  src: 'images/hero-key.webp',   // ← この行を追加
  alt: '同一キャラクターの基本立ち絵(基準画像)',
  label: '基本立ち絵',
  spec: '縦長 2:3 推奨',
},
```

- `src` が未設定のスロットは、自動的にプレースホルダー表示になります
- 形式は WebP / AVIF 推奨(表示速度のため)
- 各スロットの推奨サイズは `spec` 欄を参照してください
````

## `.github/workflows/deploy.yml`

````yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
````

## `README.md`

````markdown
# knao — Character Art Partner(営業サイト)

Steam・インディーゲーム会社向けの営業サイト。最重要ゴールは **Character Continuity & DLC Kit** の問い合わせ獲得。

React + TypeScript + Tailwind CSS(v4)+ Vite。GitHub Pages 向け静的サイト。

## 開発

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/ に出力(型チェック込み)
npm run preview  # ビルド結果の確認
```

## 構成

```
src/
  content/
    images.ts   ← 全画像スロットの一元管理(差し替えはここ)
    site.ts     ← 問い合わせフォームURL・SNSリンク・屋号
  components/   ← Header / Footer / Section / Placeholder / CtaButton
  sections/     ← ページの11セクション(表示順は App.tsx)
```

セクション順(営業ストーリー): 価値提案 → 109ページ証明 → 展開実例 → Steam/SNS/動画 → 商品 → 制作工程 → 比較 → 実績 → 料金 → FAQ・方針 → 問い合わせ

## 公開前にやること

1. **画像の差し替え** — `public/images/` に画像を置き、`src/content/images.ts` の該当スロットに `src` を設定(手順は `public/images/README.md`)
2. **問い合わせフォームURL** — `src/content/site.ts` の `contactFormUrl`(現在はプレースホルダー)
3. **OGP画像** — `public/ogp.png` を置き、`index.html` に `og:image` を追加

## GitHub Pages への公開

リポジトリを GitHub に push し、Settings → Pages → Source を「GitHub Actions」にすると、
`.github/workflows/deploy.yml` が main への push ごとに自動デプロイします。

`vite.config.ts` の `base: './'` により、`https://<user>.github.io/<repo>/` のサブパス配下でも動作します。
````
