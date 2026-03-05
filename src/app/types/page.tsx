import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SCHEMA_TYPES } from "@/lib/schema-types";

export const metadata: Metadata = {
  title: "構造化データ スキーマタイプ一覧 | 全10種類のJSON-LD対応",
  description:
    "Schema.org準拠の構造化データ（JSON-LD）を自動生成。FAQ、商品、ローカルビジネス、記事、イベントなど全10タイプに対応。各タイプの用途と設置ポイントを解説。",
  alternates: { canonical: "https://schema.ezoai.jp/types" },
  openGraph: {
    title: "構造化データ スキーマタイプ一覧 | Schema AI",
    description:
      "全10種類のSchema.org構造化データに対応。用途、設置ポイント、コード例を確認してJSON-LDを無料生成。",
    url: "https://schema.ezoai.jp/types",
  },
};

export default function TypesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-12">
          <nav className="mb-6 text-sm text-white/50">
            <Link
              href="/"
              className="transition-colors duration-200 hover:text-white"
            >
              トップ
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">スキーマタイプ一覧</span>
          </nav>

          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            構造化データ スキーマタイプ一覧
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-white/70">
            Schema AIが対応する全10種類のSchema.org構造化データタイプ。
            それぞれの用途と特徴を確認し、サイトに最適なタイプを選んでJSON-LDを生成してください。
          </p>

          <div className="mt-12 space-y-6">
            {SCHEMA_TYPES.map((schema) => (
              <Link
                key={schema.id}
                href={`/generate/${schema.id}`}
                className="group block cursor-pointer rounded-lg border border-white/10 bg-white/5 p-6 transition-all duration-200 hover:border-emerald-500/30 hover:bg-white/10"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-white">
                      {schema.nameJa}
                      <span className="ml-3 text-sm font-normal text-emerald-500">
                        {schema.name}
                      </span>
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-white/50">
                      {schema.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {schema.useCases.slice(0, 3).map((useCase) => (
                        <span
                          key={useCase}
                          className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/40"
                        >
                          {useCase}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="ml-4 mt-1 text-sm text-emerald-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    生成 →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <section className="mt-16 rounded-lg border border-white/10 bg-white/5 p-8">
            <h2 className="text-xl font-bold text-white">
              構造化データ（JSON-LD）とは
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              構造化データは、Webページの内容を検索エンジンやAIが理解しやすい形式で記述するマークアップです。
              Schema.orgの仕様に基づいたJSON-LD形式がGoogleに公式推奨されており、
              検索結果にリッチスニペット（FAQ、レビュー、価格、イベント等）として表示されます。
              2026年現在、AI検索エンジン（ChatGPT、Perplexity、Google AI Overview）でも
              構造化データを持つページが情報源として優先的に引用される傾向にあり、
              LLMO/AEO対策の基盤技術として注目されています。
            </p>
            <div className="mt-4 flex gap-4">
              <Link
                href="/guides/llmo"
                className="text-sm text-emerald-500 transition-colors duration-200 hover:text-emerald-400"
              >
                LLMO対策ガイド →
              </Link>
              <Link
                href="/guides/aeo"
                className="text-sm text-emerald-500 transition-colors duration-200 hover:text-emerald-400"
              >
                AEO対策ガイド →
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Schema AI",
                item: "https://schema.ezoai.jp",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "スキーマタイプ一覧",
                item: "https://schema.ezoai.jp/types",
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "対応スキーマタイプ一覧",
            numberOfItems: SCHEMA_TYPES.length,
            itemListElement: SCHEMA_TYPES.map((schema, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: `${schema.nameJa}（${schema.name}）`,
              url: `https://schema.ezoai.jp/generate/${schema.id}`,
            })),
          }),
        }}
      />
    </div>
  );
}
