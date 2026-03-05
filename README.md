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
| `/generate/[type]` | スキーマタイプ別生成ページ（10タイプ） |
| `/guides/llmo` | LLMO対策ガイド |
| `/guides/aeo` | AEO対策ガイド |

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
