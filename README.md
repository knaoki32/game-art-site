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
