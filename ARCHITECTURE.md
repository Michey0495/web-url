# Architecture - Schema AI

## 設計方針

- MVP: フォーム入力 → JSON-LD生成のシンプルなフロー
- SEO重視: 各スキーマタイプがSEOランディングページとして機能
- AI-First: MCP Server、llms.txt、agent.jsonを初期から搭載
- SSG優先: 生成ページは静的生成、APIのみ動的
- 外部API依存なし: すべてローカル処理

## 技術スタック

| 技術 | 用途 |
|------|------|
| Next.js 15 (App Router) | フレームワーク |
| TypeScript (strict) | 言語 |
| Tailwind CSS v4 | スタイリング |
| shadcn/ui | UIコンポーネント |
| Vercel | ホスティング |

## ディレクトリ構造

```
src/
├── app/
│   ├── layout.tsx          # ルートレイアウト（メタデータ、フォント）
│   ├── page.tsx            # トップページ（ヒーロー、タイプ一覧、3ステップ、FAQ）
│   ├── sitemap.ts          # 動的サイトマップ
│   ├── generate/
│   │   └── [type]/
│   │       └── page.tsx    # スキーマタイプ別生成ページ (SSG、10タイプ)
│   ├── guides/
│   │   ├── llmo/page.tsx   # LLMO対策ガイド
│   │   └── aeo/page.tsx    # AEO対策ガイド
│   └── api/
│       ├── generate/route.ts  # REST API: 構造化データ生成
│       └── mcp/route.ts       # MCP Server (JSON-RPC 2.0)
├── components/
│   ├── header.tsx
│   ├── footer.tsx
│   ├── schema-generator-form.tsx  # クライアントコンポーネント
│   └── ui/                        # shadcn/ui
├── lib/
│   ├── schema-types.ts     # 10スキーマタイプ定義（フィールド、例）
│   ├── generate-schema.ts  # JSON-LD生成エンジン
│   └── utils.ts            # shadcn/ui ユーティリティ
public/
├── llms.txt               # AI向けサイト説明
├── robots.txt             # AIクローラー許可
└── .well-known/
    └── agent.json         # A2A Agent Card
```

## ページ構成・ルーティング

| パス | 種別 | 説明 |
|------|------|------|
| `/` | Static | トップページ |
| `/generate/[type]` | SSG (10タイプ) | スキーマタイプ別生成ページ |
| `/guides/llmo` | Static | LLMO対策ガイド |
| `/guides/aeo` | Static | AEO対策ガイド |
| `/api/generate` | Dynamic | REST API |
| `/api/mcp` | Dynamic | MCP Server |

## データフロー

```
[ユーザー / AIエージェント]
        │
        ├── UI経由 → /generate/[type] → SchemaGeneratorForm (Client)
        │       フォーム入力 → generateSchemaJsonLd() → JSON-LD表示 + コピー
        │
        ├── REST API → POST /api/generate
        │       { type, data } → バリデーション → generateSchemaJsonLd() → JSON response
        │
        └── MCP → POST /api/mcp (JSON-RPC 2.0)
                tools/list → ツール一覧
                tools/call → generate_schema / list_schema_types
```

生成ロジック (`generate-schema.ts`) はクライアントサイドとサーバーサイドで共通。

## コンポーネント設計

- Server Components: ページ、ヘッダー、フッター（SEO、メタデータ対応）
- Client Components: SchemaGeneratorForm のみ（フォーム操作、クリップボード）

## API設計

### REST API: POST /api/generate

```json
// Request
{ "type": "faq", "data": { "siteName": "...", "siteUrl": "...", "faqContent": "..." } }

// Response (200)
{ "success": true, "type": "FAQPage", "jsonLd": "...", "htmlSnippet": "<script...>...</script>" }

// Error (400)
{ "error": "必須フィールドが未入力です: ..." }
```

### MCP Server: POST /api/mcp

JSON-RPC 2.0 プロトコル。2つのツールを提供:

| ツール名 | 説明 | パラメータ |
|----------|------|-----------|
| `generate_schema` | JSON-LD構造化データ生成 | `type`: スキーマタイプID, `data`: フィールドデータ |
| `list_schema_types` | 対応スキーマタイプ一覧 | なし |

## AI公開チャネル

| チャネル | パス | 目的 |
|----------|------|------|
| MCP Server | `/api/mcp` | AIエージェントが直接ツールとして利用 |
| A2A Agent Card | `/.well-known/agent.json` | エージェント間の発見・接続 |
| llms.txt | `/llms.txt` | AI向けサイト説明・API仕様 |
| robots.txt | `/robots.txt` | AIクローラー許可 (GPTBot, ClaudeBot, PerplexityBot等) |
| sitemap.xml | `/sitemap.xml` | 動的生成ページ一覧 |

## 対応スキーマタイプ (10種)

| ID | Schema.org Type | 用途 |
|----|----------------|------|
| faq | FAQPage | よくある質問 |
| local-business | LocalBusiness | 店舗・事業所 |
| product | Product | EC商品 |
| article | Article | ブログ・ニュース |
| breadcrumb | BreadcrumbList | ページ階層 |
| organization | Organization | 企業・団体 |
| website | WebSite | サイト情報 |
| event | Event | イベント |
| howto | HowTo | 手順ガイド |
| job-posting | JobPosting | 求人 |

## SEO戦略

- 各スキーマタイプの生成ページがSEOランディングページとして機能
- 「FAQ 構造化データ」「商品 JSON-LD」等のロングテールキーワードを獲得
- トップページにFAQPage + WebSite構造化データ設置
- OGP / Twitter Card 対応

## デプロイ

- Vercel (自動デプロイ)
- ドメイン: `schema.ezoai.jp`
- DNS: Xserver管理

## v2計画

- Claude APIによるAI生成（URL入力 → 自動分析 → 最適スキーマ推薦）
- ユーザー登録・生成履歴
- バリデーション機能（Google Rich Results Test連携）
- 追加スキーマタイプ
- 決済（Stripe）
