# HANDOFF: 営業サイト knao Character Art Partner(game-art-site)

2026-08-06 更新(Cloudflare移行 + Steamカプセル3規格の生成)。この1ファイルだけ読めば仕事を再開できることを目標にした引き継ぎ文書。

## 現在地(どこまで終わっているか)

- サイト初版実装済み(全11セクション、React + TypeScript + Tailwind v4 + Vite)
- **公開先を GitHub Pages から Cloudflare Workers(static assets)に変更した**(2026-08-06)
  - `wrangler.jsonc` を新規作成(`assets.directory: ./dist`、`not_found_handling: single-page-application`)
  - `package.json` に `deploy` スクリプト(`npm run build && wrangler deploy`)と devDependency `wrangler@^4.119.0` を追加
  - GitHub Pages用の `.github/workflows/deploy.yml` は削除済み(`.github/` ごと消えている)
  - `npx wrangler whoami` で **knaoki32@gmail.com でログイン済み**を確認。アカウントID `f23cd271c33848612ddc84d12420b5ce`、トークンに `workers (write)` / `workers_scripts (write)` があるのでデプロイ可能
  - `npx wrangler deploy --dry-run` は成功(dist/ の25ファイルを認識)。**本番デプロイはなおの確認待ちで未実行**
- 画像は全24スロット中**22スロットに実画像が入っている**(2026-08-06に `src/content/images.ts` をスクリプトで実測。以前の「25スロット中18」という記載は誤り)
  - Lovartプロジェクト: `projectId 4503bed717be4f89a10d6d62906f3cb1`
  - ⚠️ **チャット履歴は残らない**。2026-08-06に開いた時点で履歴は「新規チャット」のみで、以前のスレッド(と、そこにアップロードした `haruka_reference.jpg`)は消えていた。「同じスレッドを使えばキャラ文脈が引き継がれる」という前提はもう成立しない
  - 代わりに `@` メンションでプロジェクト内の既存画像を参照に使える。今回は「衣装比較シート」を参照にした
  - 生成画像のマスターPNGは `assets-original/` に保管、公開物はWebP
- **Steamカプセル3規格を生成・配置まで完了した**(2026-08-06、なおの指示)
  - 方針変更: 従来の「実タイトルロゴが必要だからAIでは作らない」→ **ロゴなし・同一キャラクターのビジュアルのみで3規格を作る**
  - `media-capsule-header.webp` 1840×864(2.130)/ `media-capsule-main.webp` 1856×1072(1.731)/ `media-capsule-library.webp` 1200×1808(0.664)。指定比率との差はいずれも1%以内
  - 3枚とも同じ制服・同じ塗りで、**桜と街並みを望む同じ展望台**が舞台。並べると同一キャラ・同一シーンだと一目で分かる
  - 初回生成ではヘッダーとライブラリの背景が無地グレーになり不揃いだったので、同じスレッドで追撃して2枚だけ作り直した
  - 生成モデルは GPT Image 2。**クレジット消費は合計80**(初回3枚48 + 作り直し2枚32)。残高 10916 → 10844。毎回「現在の解像度・画質・参照画像設定は無制限プランの対象外」という確認が出るので、そのつどなおの承認を取ること
  - `heroCapsule`(ファーストビュー)にもヘッダー用画像を流用済み
  - 仕様と生成結果は `lovart-generation-specs.md` の **13〜15番**
- 残りプレースホルダーは**2枠のみ** = 人手修正の前後比較(`processBefore` / `processAfter`)。**これは実制作過程のペア素材が要るのでAIで作れない**
- `src/content/site.ts` の `contactFormUrl` に**実フォーム(Googleフォーム)を設定済み**(2026-08-06、なおから受領)
- OGP画像(`og:image`)は **`index.html` に未設定**(2026-08-06確認、記載なし)
- `.claude/launch.json` の `cwd` が旧パス `C:/Users/Admin/product/game-art-site` を指していたので、現在地 `C:/Users/Admin/Claude/game-art-site` に修正済み
- MediaKitセクションに「同じ1体のキャラクターを、3規格それぞれの構図で書き出した例」というキャプションを追加(3規格を並べる意図を明示するため)
- `game-art-site-source.md` は上記すべてを反映済み(未コミット)

## 次にやること(上から着手順)

1. **Cloudflareへ本番デプロイ** — `npm run deploy`(URLは `https://game-art-site.<account>.workers.dev` になる見込み、未確認)。公開は外部公開にあたるので、実行前になおの確認を取ること。**公開を止めるブロッカーはもう無い**(フォームURLも画像も揃った)
2. OGP画像を用意して `index.html` に `og:image` を追加(`public/images/media-ogp.webp` を流用できる可能性あり)。無くても公開はできるが、SNSで共有されたときの見栄えが悪い
3. 人手修正の前後比較2枠(`processBefore` / `processAfter`)の実素材をなおから受け取る。**残る唯一のプレースホルダー**
4. (任意)問い合わせフォームが実際に届くか、公開後に自分でテスト送信して確認する

## 決定済みの事項(理由つき)

- **公開先は Cloudflare Workers**(2026-08-06、なおの指示で GitHub Pages から変更)。デプロイ手段は wrangler CLI での直接デプロイ(GitHub連携の自動デプロイではない)を選択 — GitHubにpushしなくても公開できて手数が少ないため
- **Steamカプセルはロゴなし**(2026-08-06、なおの選択)。実タイトルのロゴを待たずに済み、かつ「同一キャラクターを規格違いで書き出せる」という見せたい一点は伝わるため
- **カプセル生成にクレジットを使う**(2026-08-06、なおの承認)。解像度を落として無料枠に収める案もあったが、参照画像を外すとキャラの一貫性が崩れる — それはこのサイトの売りそのものなので、48クレジット払う方を選んだ
- デザインはダーク基調(`#111217`)+ 金アクセント(`#C9A24A`)、作品画像を主役にしてUIは最小限(理由: 未確認。`game-art-site-source.md` に方針として明記されているのみ)
- コピーライティングの規約: 「ComfyUIは使用していない」ため記載しない/工程は「基準画像→プロンプト設計→参照生成→人手修正→保管」と書く/ページ番号は制作者確認済みのもの(P.7・P.39・P.100)のみ使用/料金は参考価格として明示(DLC Kit 22万円〜・Steam Kit 30万円〜・LiveOps月額24万円〜、変動する旨を併記)。**これらは `game-art-site-source.md` に「変更時も維持すること」と明記された規約なので、コピーを書き換えるときは必ず確認する**

## このプロジェクトのルールと地雷

- ⚠️ 画像を差し替えるときは `public/images/` にファイルを置くだけでなく、`src/content/images.ts` の該当スロットに `src` を設定しないと反映されない(`public/images/README.md` に手順あり)
- ⚠️ `game-art-site-source.md` が実質の一次資料。コードとこのMarkdownの内容がズレていないか、作業前後で確認する習慣をつけること
- ⚠️ **AI Creator Vault にこのプロジェクトのノートが1つも無い**(2026-08-06確認、`game-art-site`/`営業サイト` でgrepしてもヒットなし)。Vaultの `Projects/` はキャラ画像投稿の月次管理テンプレートで、索引は `vault_manager.py` の自動生成(「手動編集しないこと」と明記)。開発案件を置く場所が決まっていないので、**なおに置き場所を確認してから作ること**
- コピーライティングの規約(上記)を無視した書き換えは差し戻し対象になりうる

## 再開手順

1. このファイルを読む
2. `git status` で未コミットの変更を確認(2026-08-06時点で、Cloudflare移行とカプセル3枚の一式が未コミット)
3. `npm install && npm run dev` でローカル確認しながら着手(http://localhost:5173)
4. デプロイは `npm run deploy`(初回のみ `npx wrangler login`。2026-08-06時点ではログイン済み)
