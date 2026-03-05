import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "LLMO対策ガイド - AI検索時代のSEO戦略",
  description:
    "LLMO（Large Language Model Optimization）とは？AI検索エンジンに自サイトを最適化するための構造化データ活用ガイド。",
  alternates: { canonical: "https://schema.ezoai.jp/guides/llmo" },
  openGraph: {
    title: "LLMO対策ガイド - AI検索時代のSEO戦略 | Schema AI",
    description:
      "LLMOとは？構造化データ、llms.txt、robots.txtを活用してAI検索エンジンでの露出を最大化する方法を解説。",
    url: "https://schema.ezoai.jp/guides/llmo",
  },
};

export default function LLMOGuidePage() {
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
            <span className="text-white">LLMO対策ガイド</span>
          </nav>

          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            LLMO対策ガイド
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-white/70">
            LLMO（Large Language Model
            Optimization）は、ChatGPT・Perplexity・Claude等のAI検索エンジンに
            自サイトの情報を正確に認識・引用させるための最適化施策です。
          </p>

          <div className="mt-12 space-y-8">
            <section className="rounded-lg border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-bold text-white">
                1. LLMOとは何か
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                従来のSEOがGoogleの検索アルゴリズムに最適化するのに対し、
                LLMOはLLM（大規模言語モデル）ベースのAI検索エンジンに最適化します。
                2026年、日本のデジタルマーケティングにおいて最も注目されている施策です。
              </p>
            </section>

            <section className="rounded-lg border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-bold text-white">
                2. 構造化データの重要性
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                AI検索エンジンはJSON-LD構造化データを優先的に情報源として利用します。
                適切な構造化データを設置することで、AIがページの内容を正確に理解し、
                回答生成時に引用する確率が大幅に向上します。
              </p>
              <div className="mt-4">
                <Link
                  href="/generate/faq"
                  className="text-sm text-emerald-500 transition-colors duration-200 hover:text-emerald-400"
                >
                  FAQ構造化データを生成する →
                </Link>
              </div>
            </section>

            <section className="rounded-lg border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-bold text-white">
                3. llms.txtの活用
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                llms.txtはAI向けのサイト説明ファイルです。サイトのルートに配置し、
                サービスの概要、機能、APIの使い方をAIが理解しやすい形式で記述します。
                これにより、AIエージェントがサイトの情報を正確に把握できます。
              </p>
            </section>

            <section className="rounded-lg border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-bold text-white">
                4. robots.txtでのAIクローラー対応
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                robots.txtでAIクローラー（GPTBot、ClaudeBot、PerplexityBot等）を
                明示的に許可することで、AI検索エンジンがサイトの情報をインデックスできます。
                ブロックしている場合、AI検索での露出がゼロになる可能性があります。
              </p>
            </section>

            <section className="rounded-lg border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-bold text-white">
                5. 今すぐできるLLMO対策
              </h2>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/70">
                <li>- JSON-LD構造化データの設置（FAQ、Organization、WebSite等）</li>
                <li>- llms.txtの作成・公開</li>
                <li>- robots.txtでAIクローラーを許可</li>
                <li>- コンテンツの明確な構造化（見出し、リスト、表の活用）</li>
                <li>- メタデータの充実（description、OGP）</li>
              </ul>
              <div className="mt-4">
                <Link
                  href="/generate/website"
                  className="text-sm text-emerald-500 transition-colors duration-200 hover:text-emerald-400"
                >
                  WebSite構造化データを生成する →
                </Link>
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
            headline: "LLMO対策ガイド - AI検索時代のSEO戦略",
            description:
              "LLMOとは？AI検索エンジンに自サイトを最適化するための構造化データ活用ガイド。",
            author: { "@type": "Organization", name: "Schema AI" },
            publisher: { "@type": "Organization", name: "Schema AI" },
            url: "https://schema.ezoai.jp/guides/llmo",
          }),
        }}
      />
    </div>
  );
}
