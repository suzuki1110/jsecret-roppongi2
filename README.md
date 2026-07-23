# J.secret 六本木 公式サイト（デモ版）

六本木の貸切プライベート空間「J.secret」の静的サイトです。
GitHub Pagesでの確認用に、HTML / CSS / Vanilla JavaScriptのみで構成しています（PHP・ビルド処理なし）。

## ディレクトリ構成

```
/
├── index.html            … TOPページ
├── 404.html               … 404ページ
├── .nojekyll               … GitHub PagesにJekyll処理をさせないための空ファイル
├── assets/
│   ├── css/
│   │   ├── reset.css       … 最小限のリセットCSS
│   │   ├── common.css      … 全ページ共通（トークン・ヘッダー・フッター・ボタン・FAQ等）
│   │   └── top.css         … TOPページ専用（ヒーロー・シーン紹介・最終CTA等）
│   ├── js/
│   │   ├── common.js       … メニュー開閉・ヘッダー制御・FAQアコーディオン
│   │   └── hero-slider.js  … フルスクリーン写真スライダー（クロスフェード）
│   └── images/
│       ├── hero/            … ファーストビュー用（高解像度のみ厳選）
│       ├── space/            … 店内・テラス・レイアウト
│       ├── food/             … BBQ・料理
│       ├── party/            … パーティー全般
│       ├── live/             … ライブ演奏
│       ├── dance/            … ダンスショー
│       ├── family/           … 子ども会・ペット同伴
│       ├── business/         … 企業利用・セミナー
│       ├── exterior/         … 外観
│       ├── access/           … アクセス用
│       └── detail/           … 設備・テーブルなどのディテール
└── README.md
```

**追加済みのページ**（今回すべて作成しました）:
`concept.html` / `courses/index.html` / `courses/basic.html` / `courses/special.html` / `courses/rental-space.html` /
`gallery.html` / `events.html` / `voices.html` / `faq.html` / `access.html` / `contact.html` / `privacy.html` / `commercial-law.html`

TOPページからこれらすべてへ実際にリンクが機能します。

## ローカルでの確認方法

ビルド不要です。`index.html` をブラウザで直接開くか、簡易サーバーを立てて確認してください。

```bash
cd (このフォルダ)
python3 -m http.server 8000
# ブラウザで http://localhost:8000 を開く
```

## GitHub Pagesでの公開手順

1. GitHubで新しいリポジトリを作成（例: `jsecret-roppongi`）
2. このフォルダの中身一式をリポジトリ直下にアップロード（`index.html` がルート直下にある状態）
3. リポジトリの `Settings` → `Pages` で、Branch を `main` / フォルダを `/(root)` にして保存
4. 数分後、`https://ユーザー名.github.io/リポジトリ名/` で公開されます

## 写真の差し替え方法

各画像は `assets/images/カテゴリ名/ファイル名.jpg` に格納されています。
差し替える際は **同じファイル名で上書き** すれば、HTML側の修正は不要です。
ファイル名を変更する場合は、`index.html` 内の該当する `<img src="...">` も合わせて変更してください。

## 文章の変更箇所

- キャッチコピー・サブコピー：`index.html` 内 `.hero-copy` 内のテキスト
- コンセプト文：`.concept-intro` 内のテキスト
- 01〜03の理由文：`.split-row` 内のテキスト
- コース料金・お客様の声・FAQ回答：該当箇所に `[要確認：〜]` の形式でプレースホルダーを入れています。事実確認後、直接書き換えてください。

## デモ版noindexの削除方法（正式公開時）

`index.html`（および今後作成する全ページ）の `<head>` 内にある以下の行を削除してください。

```html
<meta name="robots" content="noindex, nofollow, noarchive">
```

あわせて、OGP画像・URLのコメントアウト部分（`<!-- <meta property="og:url" ... -->`）も正式なURLに差し替えてコメントを解除してください。

## WordPress移植時の注意点

- 現在のCSSはクラス名ベースで再利用可能な設計にしているため、WordPressテーマ側にそのまま流用しやすい構成です。
- `common.js` / `hero-slider.js` はVanilla JSのみで依存ライブラリなし。WordPress側のjQuery等と競合しないか確認してください。
- フォーム（`contact.html`）は現状デザイン確認用で送信処理を持たないため、WordPress移植時にプラグインまたはPHP処理を実装してください。
- 構造化データ（JSON-LD）はページごとに適切な `@type`（Restaurant / EventVenue / FAQPage / BreadcrumbList等）に調整してください。

## 未確定情報一覧（要確認）

- 最大利用人数の正式な人数
- カラオケ設備の有無・詳細
- 駐車場の有無・近隣駐車場情報
- バリアフリー対応の有無
- 喫煙可否
- ペット同伴の正式ルール
- キャンセル規定・返金条件
- 支払い方法の詳細（現金・カード・法人請求等）
- LINE公式アカウントURL
- 正式な独自ドメイン・OGP画像
