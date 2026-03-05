# Architecture - Schema AI

## 設計方針

- MVP: フォーム入力 → JSON-LD生成のシンプルなフロー
- SEO重視: 各スキーマタイプがSEOランディングページとして機能
- AI-First: MCP Server、llms.txt、agent.jsonを初期から搭載

## ディレクトリ構造

```
src/
├── app/
│   ├── layout.tsx          # ルートレイアウト（メタデータ、フォント）
│   ├── page.tsx            # トップページ
│   ├── sitemap.ts          # 動的サイトマップ
│   ├── generate/
│   │   └── [type]/
│   │       └── page.tsx    # スキーマタイプ別生成ページ
│   ├── guides/
│   │   ├── llmo/page.tsx   # LLMO対策ガイド
│   │   └── aeo/page.tsx    # AEO対策ガイド
│   └── api/
│       ├── generate/route.ts  # REST API
│       └── mcp/route.ts       # MCP Server
├── components/
│   ├── header.tsx
│   ├── footer.tsx
│   ├── schema-generator-form.tsx  # クライアントコンポーネント
│   └── ui/                        # shadcn/ui
├── lib/
│   ├── schema-types.ts     # スキーマタイプ定義
│   ├── generate-schema.ts  # JSON-LD生成ロジック
│   └── utils.ts            # shadcn/ui ユーティリティ
public/
├── llms.txt
├── robots.txt
└── .well-known/
    └── agent.json
```

## データフロー

```
ユーザー入力 → SchemaGeneratorForm (Client)
  → generateSchemaJsonLd() → JSON-LD文字列 → 表示 + コピー

API経由:
  POST /api/generate → JSON-LD + HTMLスニペット

MCP経由:
  POST /api/mcp (JSON-RPC 2.0)
    → tools/list: ツール一覧
    → tools/call generate_schema: JSON-LD生成
    → tools/call list_schema_types: タイプ一覧
```

## コンポーネント設計

- Server Components: ページ、ヘッダー、フッター（SEO、メタデータ対応）
- Client Components: SchemaGeneratorForm のみ（フォーム操作、クリップボード）

## MCP Server設計

### エンドポイント
`POST /api/mcp`

### プロトコル
JSON-RPC 2.0

### ツール

#### generate_schema
- 入力: `{ type: string, data: Record<string, string> }`
- 出力: JSON-LD構造化データ文字列
- 対応タイプ: faq, local-business, product, article, breadcrumb, organization, website, event, howto, job-posting

#### list_schema_types
- 入力: なし
- 出力: 対応スキーマタイプの一覧（ID、名前、説明、必須フィールド）

## SEO戦略

- 各スキーマタイプの生成ページがSEOランディングページとして機能
- 「FAQ 構造化データ」「商品 JSON-LD」等のロングテールキーワードを獲得
- 全ページにBreadcrumbList構造化データ設置
- トップページにFAQPage構造化データ設置

## v2計画

- Claude APIによるAI生成（URL入力 → 自動分析 → 最適スキーマ推薦）
- ユーザー登録・生成履歴
- バリデーション機能
- 追加スキーマタイプ
- 決済（Stripe）
