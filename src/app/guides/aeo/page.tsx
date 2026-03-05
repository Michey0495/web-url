import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "AEO対策ガイド - AI Engine Optimization入門",
  description:
    "AEO（AI Engine Optimization）の基本と実践。構造化データを活用してAI検索エンジンでの可視性を最大化する方法を解説。",
  alternates: { canonical: "https://schema.ezoai.jp/guides/aeo" },
  openGraph: {
    title: "AEO対策ガイド - AI Engine Optimization入門 | Schema AI",
    description:
      "AEOの基本と実践。構造化データを活用してAI検索エンジンでの可視性を最大化する方法を解説。",
    url: "https://schema.ezoai.jp/guides/aeo",
  },
};

export default function AEOGuidePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <nav className="mb-6 text-sm text-white/50">
            <Link
              href="/"
              className="transition-colors duration-200 hover:text-white"
            >
              トップ
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">AEO対策ガイド</span>
          </nav>

          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            AEO対策ガイド
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-white/70">
            AEO（AI Engine Optimization）は、AIベースの検索エンジンや
            アシスタントに対してWebサイトを最適化する施策です。
            LLMO（Large Language Model Optimization）とほぼ同義で使われます。
          </p>

          <div className="mt-12 space-y-8">
            <section className="rounded-lg border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-bold text-white">
                1. AEOが重要な理由
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                2026年、検索の約40%がAIアシスタント経由で行われるようになりました。
                ChatGPT、Perplexity、Google AI
                Overviewなどが従来の検索結果に代わって
                直接回答を提供しています。AEO対策なしでは、これらの流入を失います。
              </p>
            </section>

            <section className="rounded-lg border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-bold text-white">
                2. 構造化データによるAEO
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                構造化データ（JSON-LD）はAEOの最も効果的な技術的施策です。
                FAQPage構造化データを設置すると、AI検索での引用率が平均2.5倍に向上
                するという調査結果があります。
              </p>
              <div className="mt-4 space-y-2">
                <Link
                  href="/generate/faq"
                  className="block text-sm text-emerald-500 transition-colors duration-200 hover:text-emerald-400"
                >
                  FAQ構造化データを生成 →
                </Link>
                <Link
                  href="/generate/organization"
                  className="block text-sm text-emerald-500 transition-colors duration-200 hover:text-emerald-400"
                >
                  Organization構造化データを生成 →
                </Link>
              </div>
            </section>

            <section className="rounded-lg border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-bold text-white">
                3. AEO対策チェックリスト
              </h2>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/70">
                <li>- WebSite構造化データの設置</li>
                <li>- FAQPage構造化データの設置</li>
                <li>- Organization構造化データの設置</li>
                <li>- llms.txtの作成</li>
                <li>- .well-known/agent.json (A2A Agent Card) の設置</li>
                <li>- robots.txtでAIクローラーを明示的に許可</li>
                <li>- メタデータの充実（description、canonical、OGP）</li>
                <li>- コンテンツの質と構造の改善</li>
              </ul>
            </section>

            <section className="rounded-lg border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-bold text-white">
                4. Schema.orgタイプ別のAEO効果
              </h2>
              <div className="mt-3 space-y-3 text-sm text-white/70">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span>FAQPage</span>
                  <span className="text-emerald-500">効果: 高</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span>HowTo</span>
                  <span className="text-emerald-500">効果: 高</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span>Article</span>
                  <span className="text-emerald-500">効果: 中〜高</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span>Product</span>
                  <span className="text-emerald-500">効果: 中</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span>LocalBusiness</span>
                  <span className="text-emerald-500">効果: 中</span>
                </div>
                <div className="flex justify-between">
                  <span>Organization</span>
                  <span className="text-emerald-500">効果: 中</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "AEO対策ガイド - AI Engine Optimization入門",
            description:
              "AEOの基本と実践。構造化データを活用してAI検索エンジンでの可視性を最大化する方法。",
            author: { "@type": "Organization", name: "Schema AI" },
            publisher: { "@type": "Organization", name: "Schema AI" },
            url: "https://schema.ezoai.jp/guides/aeo",
          }),
        }}
      />
    </div>
  );
}
