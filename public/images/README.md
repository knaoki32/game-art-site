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
