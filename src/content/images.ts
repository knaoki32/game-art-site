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
    src: 'images/hero-expressions.webp',
    alt: '同一キャラクターの表情差分シート(通常・笑顔・驚き・怒り・照れ・悲しみの6表情)',
    label: '表情差分',
    spec: '横長 4:3',
  },
  heroCostume: {
    src: 'images/hero-costume.webp',
    alt: '同一キャラクターの衣装差分(私服パーカー姿の立ち絵)',
    label: '衣装差分',
    spec: '横長 4:3',
  },
  heroDlc: {
    src: 'images/hero-dlc.webp',
    alt: '同一キャラクターのDLC想定の特別衣装(金刺繍の白と赤のドレス)',
    label: 'DLC衣装',
    spec: '横長 4:3',
  },
  heroCapsule: {
    alt: '同一キャラクターを使用したSteamカプセル画像',
    label: 'Steamカプセル',
    spec: '460×215',
  },
  heroSns: {
    src: 'images/hero-sns.webp',
    alt: '同一キャラクターを使用したSNS告知風ビジュアル(夕方の街・コピー用余白つき)',
    label: 'SNS画像',
    spec: '16:9',
  },
  heroVideo: {
    src: 'images/hero-video.webp',
    alt: '同一キャラクターの動画サムネイル(カメラに手を振るバストアップ)',
    label: '動画',
    spec: '4:3',
  },

  /* ── 2. 109ページの証明 ── */
  proofPageEarly: {
    src: 'images/7.webp',
    alt: 'フルカラー漫画 P.7(皿洗いの場面)。ヒロインの顔立ちと体型',
    label: 'P.7 の場面',
    spec: '縦長 3:4',
  },
  proofPageMid: {
    src: 'images/39.webp',
    alt: 'フルカラー漫画 P.39(雪の日にスーツ姿で空を見上げる場面)。同一ヒロインの顔立ちが同じ',
    label: 'P.39 の場面',
    spec: '縦長 3:4',
  },
  proofPageLate: {
    src: 'images/100.jpg',
    alt: 'フルカラー漫画 P.100(卒業式・袴姿の場面)。同一ヒロインの顔立ち・体型・塗りが序盤と同じ',
    label: 'P.100 の場面',
    spec: '縦長 3:4',
  },
  proofExpressions: {
    src: 'images/manga_angles.jpg',
    alt: '同一キャラクターの表情・アングル比較(お辞儀・むくれ顔・横顔)',
    label: '表情比較シート',
    spec: '横長 16:7',
  },
  proofCostumes: {
    src: 'images/proof-costumes.webp',
    alt: '同一キャラクターの衣装比較シート(制服・私服・浴衣・ドレスの4衣装を同じポーズで並べたもの)',
    label: '衣装比較シート',
    spec: '横長 16:7',
  },

  /* ── 3. キャラクター展開実例 ── */
  expansionBase: {
    src: 'images/haruka_reference.jpg',
    alt: 'ベースキャラクターの基本立ち絵(基準画像と同一)',
    label: 'ベースキャラクター(基本立ち絵)',
    spec: '縦長 2:3',
  },
  expansionDlcPack: {
    src: 'images/expansion-dlc-pack.webp',
    alt: '同一キャラクターのDLC衣装パック(メイド服・騎士風衣装・魔法使いローブの3衣装立ち絵)',
    label: 'DLC衣装パック(3衣装)',
    spec: '横長 4:3',
  },
  expansionSeasonal: {
    src: 'images/expansion-seasonal.webp',
    alt: '同一キャラクターの季節イベント衣装(夏の水着・ハロウィン・正月の晴れ着)',
    label: '季節イベント衣装',
    spec: '横長 4:3',
  },
  expansionNewChar: {
    src: 'images/expansion-new-char.webp',
    alt: '同じ画風・同じ塗りで描いた追加キャラクター「なつみ」(金髪ウェーブロング・青い瞳・サングラスを頭にのせた大人っぽい女性)',
    label: '追加キャラクター(同じ画風)',
    spec: '横長 4:3',
  },
  expansionEventCg: {
    src: 'images/expansion-event-cg.webp',
    alt: '同一キャラクターのイベントCG(夕暮れの海辺で振り返る一枚絵)',
    label: 'イベントCG / スチル',
    spec: '横長 4:3',
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
    src: 'images/media-ogp.webp',
    alt: 'SNS・OGP向けの16:9告知イメージ(DLCドレス姿で発表ポーズ・紙吹雪の背景)',
    label: 'SNS / OGP 告知画像',
    spec: '16:9',
  },
  mediaVideo: {
    src: 'images/media-video.webp',
    alt: '同一キャラクターの縦型動画(9:16)サムネイル(放課後の街で話しかけるポーズ)',
    label: '縦型動画',
    spec: '9:16 クリック再生',
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
