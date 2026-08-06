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
 * ⚠️ 2026-08-06、AI生成分をすべて「ファンタジーRPG版はるか」に作り直した(Steamのゲームキャラ寄せ)。
 *    基準は haruka-fantasy-base.webp。顔立ち・髪型・瞳・ピンクのリボンは従来のはるかのまま、
 *    装備と世界観だけをファンタジーに変更している。旧・学園版のマスターPNGは
 *    assets-original/archive-school-uniform/ に退避済み(消していない)。
 *
 * ⚠️ 漫画の実ページ(7.webp / 39.webp / 100.jpg / manga_angles.jpg)は
 *    なおが実際に描いた109ページの実物。実績の証明そのものなので、AI生成に差し替えないこと。
 *    このためproofセクションだけは学園モノの絵柄のままだが、
 *    漫画のヒロインとはるかは別キャラ・別作品なので筋は通っている。
 *
 * 修正前/後の2枠だけが、実制作過程のペア素材ができるまでプレースホルダーのまま。
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
    src: 'images/haruka-fantasy-base.webp',
    alt: '同一キャラクター「はるか」の基本立ち絵(冒険者装備・正面)。革のコルセットとマント、ショートソードを持つ全身。基準画像',
    label: '基本立ち絵',
    spec: '縦長 2:3 推奨',
  },
  heroExpressions: {
    src: 'images/hero-expressions.webp',
    alt: '同一キャラクターの表情差分シート(冒険者装備のまま通常・笑顔・驚き・怒り・照れ・悲しみの6表情)',
    label: '表情差分',
    spec: '横長 4:3',
  },
  heroCostume: {
    src: 'images/hero-costume.webp',
    alt: '同一キャラクターの装備差分(魔法使いローブ装備の立ち絵)',
    label: '衣装差分',
    spec: '横長 4:3',
  },
  heroDlc: {
    src: 'images/hero-dlc.webp',
    alt: '同一キャラクターのDLC想定の特別装備(白と金の聖騎士風礼装アーマー)',
    label: 'DLC衣装',
    spec: '横長 4:3',
  },
  heroCapsule: {
    src: 'images/media-capsule-header.webp',
    alt: '同一キャラクターを使用したSteamヘッダーカプセル(460×215)。夕暮れの高台から城下町を望む背景に、冒険者装備を右に寄せ、左にロゴ用の余白を残した構図',
    label: 'Steamカプセル',
    spec: '460×215',
  },
  heroSns: {
    src: 'images/hero-sns.webp',
    alt: '同一キャラクターを使用したSNS告知風ビジュアル(ファンタジーの街を背景に、コピー用余白つき)',
    label: 'SNS画像',
    spec: '16:9',
  },
  heroVideo: {
    src: 'images/hero-video.webp',
    alt: '同一キャラクターの動画サムネイル(剣を構えるアクションポーズのバストアップ)',
    label: '動画',
    spec: '4:3',
  },

  /* ── 2. 109ページの証明 ── */
  /* ⚠️ ここから3枠 + proofExpressions は「実際に描いた109ページの漫画」の実物。
     実績の証明そのものなので、AI生成に差し替えないこと(2026-08-06のファンタジー刷新でも対象外にした) */
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
    alt: '同一キャラクターの装備比較シート(冒険者装備・魔法使いローブ・聖騎士礼装・街着の4装備を同じポーズで並べたもの)',
    label: '衣装比較シート',
    spec: '横長 16:7',
  },

  /* ── 3. キャラクター展開実例 ── */
  expansionBase: {
    src: 'images/haruka-fantasy-base.webp',
    alt: 'ベースキャラクターの基本立ち絵(基準画像と同一の冒険者装備)',
    label: 'ベースキャラクター(基本立ち絵)',
    spec: '縦長 2:3',
  },
  expansionDlcPack: {
    src: 'images/expansion-dlc-pack.webp',
    alt: '同一キャラクターのDLC装備パック(重騎士鎧・弓使いの軽装・暗殺者風の黒装束の3装備立ち絵)',
    label: 'DLC衣装パック(3衣装)',
    spec: '横長 4:3',
  },
  expansionSeasonal: {
    src: 'images/expansion-seasonal.webp',
    alt: '同一キャラクターの季節イベント衣装(夏の水辺の軽装・ハロウィンの魔女・冬の毛皮つきコート)',
    label: '季節イベント衣装',
    spec: '横長 4:3',
  },
  expansionNewChar: {
    src: 'images/expansion-new-char.webp',
    alt: '同じ画風・同じ塗りで描いた追加キャラクター「なつみ」(金髪ウェーブロング・青い瞳の大人っぽい女性のファンタジー装備立ち絵)',
    label: '追加キャラクター(同じ画風)',
    spec: '横長 4:3',
  },
  expansionEventCg: {
    src: 'images/expansion-event-cg.webp',
    alt: '同一キャラクターのイベントCG(ファンタジー世界の遺跡や街道を舞台にした一枚絵)',
    label: 'イベントCG / スチル',
    spec: '横長 4:3',
  },

  /* ── 4. Steam・SNS・動画への展開 ── */
  mediaCapsuleHeader: {
    src: 'images/media-capsule-header.webp',
    alt: 'Steamヘッダーカプセル(460×215)規格。夕暮れの高台から城下町を望む背景に、同一キャラクターの冒険者装備を右に寄せ、左にロゴ用の余白を残した構図',
    label: 'ヘッダーカプセル',
    spec: '460×215',
  },
  mediaCapsuleMain: {
    src: 'images/media-capsule-main.webp',
    alt: 'Steamメインカプセル(616×353)規格。ヘッダーと同じキャラクター・同じ装備・同じ高台で、夕暮れの城下町を背景にした引きの構図',
    label: 'メインカプセル',
    spec: '616×353',
  },
  mediaCapsuleLibrary: {
    src: 'images/media-capsule-library.webp',
    alt: 'Steamライブラリ縦型カプセル(600×900)規格。同じキャラクター・同じ装備・同じ高台の全身を縦構図で収めたもの',
    label: 'ライブラリ縦型',
    spec: '600×900',
  },
  mediaOgp: {
    src: 'images/media-ogp.webp',
    alt: 'SNS・OGP向けの横長告知イメージ(夕暮れの高台から城下町を望む構図・左側にタイトル用の余白)',
    label: 'SNS / OGP 告知画像',
    spec: '16:9',
  },
  mediaVideo: {
    src: 'images/media-video.webp',
    alt: '同一キャラクターの縦型動画(9:16)サムネイル(夕暮れの高台に立つ全身)',
    label: '縦型動画',
    spec: '9:16 クリック再生',
  },

  /* ── 6. 制作工程 ──
     ⚠️ この2枠は現在どこからも描画されていない(2026-08-06)。
     提示できる実素材(同じ絵の修正前/修正後のペア)が揃わないため、
     Process.tsx から比較画像を外して文言だけのパネルにした。
     実素材が用意できたら、ここに src を入れたうえで Process.tsx に画像枠を戻すこと。
     スロット定義を残しているのは、戻すときの手数を減らすため。 */
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
