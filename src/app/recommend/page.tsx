import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SchemaRecommendQuiz } from "@/components/schema-recommend-quiz";

export const metadata: Metadata = {
  title: "スキーマタイプ診断 - あなたに最適な構造化データを見つけよう",
  description:
    "3つの質問に答えるだけで、あなたのWebサイトに最適な構造化データ（JSON-LD）のタイプを診断。Schema AIが最適なスキーマタイプを提案します。",
  alternates: { canonical: "https://schema.ezoai.jp/recommend" },
  openGraph: {
    title: "スキーマタイプ診断 | Schema AI",
    description:
      "3つの質問に答えるだけで最適な構造化データタイプを診断。無料で即座に結果が分かります。",
    url: "https://schema.ezoai.jp/recommend",
  },
};

export default function RecommendPage() {
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
            <span className="text-white">スキーマタイプ診断</span>
          </nav>

          <h1 className="text-3xl font-bold text-white">
            スキーマタイプ診断
          </h1>
          <p className="mt-3 text-base leading-relaxed text-white/70">
            3つの質問に答えるだけで、あなたのWebサイトに最適な構造化データタイプを提案します。
          </p>

          <div className="mt-8">
            <SchemaRecommendQuiz />
          </div>
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
                name: "スキーマタイプ診断",
                item: "https://schema.ezoai.jp/recommend",
              },
            ],
          }),
        }}
      />
    </div>
  );
}
