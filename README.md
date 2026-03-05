# Schema AI

AI構造化データジェネレーター。Schema.org準拠のJSON-LD構造化データをAIが自動生成。LLMO/AEO時代のSEO対策を誰でも簡単に。

## 技術スタック

- Next.js 15 (App Router)
- TypeScript (strict)
- Tailwind CSS
- shadcn/ui

## セットアップ

```bash
npm install
npm run dev
```

http://localhost:3000 で起動。

## ページ構成

| パス | 説明 |
|------|------|
| `/` | トップページ: スキーマタイプ一覧、3ステップ説明、FAQ |
| `/types` | スキーマタイプ一覧ディレクトリ |
| `/generate/[type]` | スキーマタイプ別生成ページ（10タイプ） |
| `/guides/llmo` | LLMO対策ガイド |
| `/guides/aeo` | AEO対策ガイド |
| `/recommend` | スキーマタイプ診断（3問で最適なタイプを提案） |
| `/about` | Schema AIについて |

## 対応スキーマタイプ

| タイプ | Schema.org | 用途 |
|--------|-----------|------|
| FAQ | FAQPage | よくある質問 |
| ローカルビジネス | LocalBusiness | 店舗・事業所 |
| 商品 | Product | EC商品情報 |
| 記事 | Article | ブログ・ニュース |
| パンくず | BreadcrumbList | ページ階層 |
| 組織 | Organization | 企業・団体 |
| Webサイト | WebSite | サイト情報 |
| イベント | Event | イベント情報 |
| ハウツー | HowTo | 手順ガイド |
| 求人 | JobPosting | 求人情報 |

## API

| エンドポイント | メソッド | 説明 |
|---------------|---------|------|
| `/api/generate` | POST | 構造化データ生成 |
| `/api/mcp` | POST | MCP Server (JSON-RPC 2.0) |
| `/api/feedback` | POST | フィードバック受付 → GitHub Issue作成 |

## AI公開チャネル

- `/llms.txt` - AI向けサイト説明
- `/.well-known/agent.json` - A2A Agent Card
- `/robots.txt` - AIクローラー許可設定
- `/api/mcp` - MCP Server エンドポイント

## デプロイ

```bash
npm run build
```

Vercel にデプロイ。ドメイン: `schema.ezoai.jp`

## 開発進捗

### Night 1 (完了)
- プロジェクト初期化 (Next.js 15, Tailwind CSS, shadcn/ui)
- 10スキーマタイプのフォーム定義とJSON-LD生成エンジン
- スキーマタイプ別生成ページ（動的ルーティング）
- REST API + MCP Server
- トップページ（ヒーロー、タイプ一覧、3ステップ、FAQ）
- LLMO/AEOガイドページ
- AI公開チャネル (llms.txt, agent.json, robots.txt, MCP)
- SEOメタデータ、OGP、構造化データ、sitemap.xml

### Night 2 (完了)
- フォームバリデーション（必須フィールド未入力時のエラー表示）
- HTMLスニペット出力（scriptタグ付きでそのままコピー可能）
- フィードバックウィジェット + `/api/feedback` エンドポイント
- Google Analytics対応（`NEXT_PUBLIC_GA_ID` 環境変数で設定）

### Night 3 (完了)
- 全10スキーマタイプにSEOコンテンツ追加（longDescription, useCases, tips, relatedTypes）
- 生成ページに「主な用途」「設置のポイント」「関連する構造化データ」セクション追加
- `/types` ページ新設（スキーマタイプ一覧ディレクトリ、ItemList構造化データ付き）
- 全ページにOGPメタデータ追加（generate, guides）
- ヘッダーナビゲーション改善（スキーマ一覧リンク追加）
- サイトマップ修正（不要ルート削除、/types追加）

### Night 4 (完了)
- フォームUX改善: リセットボタン、JSON-LDダウンロード、生成後自動スクロール
- 生成履歴機能: localStorageに最大20件保存、直近5件を表示
- ランディングページ強化: 構造化データ前後比較セクション、ターゲットユーザーセクション、ボトムCTA
- `/about` ページ新設: サービス概要、特徴、対応タイプ、API情報
- ヘッダー・フッター・サイトマップ・llms.txt更新

### Night 5 (完了)
- JSON-LDバリデーション機能: 生成後に構造チェック、エラー・警告を表示
- `/recommend` ページ新設: 3問のクイズで最適なスキーマタイプを診断・推奨
- キーボードショートカット: Ctrl+Enter（Cmd+Enter）で生成実行
- モバイルUX改善: ヘッダーナビのレスポンシブ対応（ガイドリンクをPC表示のみに）
- ヘッダー・フッター・サイトマップ・llms.txt更新
