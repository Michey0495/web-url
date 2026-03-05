import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Schema AIについて - 構造化データ自動生成ツール",
  description:
    "Schema AIは、Schema.org準拠のJSON-LD構造化データを無料で自動生成するWebツールです。LLMO/AEO時代のSEO対策を誰でも簡単に。",
  alternates: { canonical: "https://schema.ezoai.jp/about" },
  openGraph: {
    title: "Schema AIについて | 無料構造化データジェネレーター",
    description:
      "Schema.org準拠のJSON-LDをフォーム入力だけで自動生成。10スキーマタイプ対応、無料・登録不要。",
    url: "https://schema.ezoai.jp/about",
  },
};

export default function AboutPage() {
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
            <span className="text-white">Schema AIについて</span>
          </nav>

          <h1 className="text-3xl font-bold text-white">Schema AIについて</h1>
          <p className="mt-4 text-base leading-relaxed text-white/70">
            Schema AIは、Schema.org準拠のJSON-LD構造化データを無料で自動生成するWebツールです。
          </p>

          <section className="mt-12">
            <h2 className="text-xl font-bold text-white">
              なぜSchema AIを作ったのか
            </h2>
            <div className="mt-4 rounded-lg border border-white/10 bg-white/5 p-6">
              <p className="text-sm leading-relaxed text-white/70">
                2026年、AI検索が急速に普及し、ChatGPT、Perplexity、Google AI
                Overviewsなどが検索体験を根本から変えています。
                この新しい検索環境では、構造化データを持つWebサイトが圧倒的に有利です。
                しかし、構造化データの実装には技術的な知識が必要で、多くのWeb担当者にとってハードルが高い状況でした。
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                Schema AIは、この課題を解決するために生まれました。
                フォームに情報を入力するだけで、Schema.org準拠の正しいJSON-LDコードが生成されます。
                技術的な知識がなくても、誰でも構造化データを実装できるようになります。
              </p>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-bold text-white">特徴</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                {
                  title: "完全無料",
                  desc: "登録不要、制限なし。すべての機能を無料で利用可能。",
                },
                {
                  title: "10スキーマタイプ対応",
                  desc: "FAQ、商品、ローカルビジネス、記事など、主要な10タイプをカバー。",
                },
                {
                  title: "Schema.org準拠",
                  desc: "生成されるJSON-LDはSchema.orgの最新仕様に準拠。Googleリッチリザルトテストで検証済み。",
                },
                {
                  title: "AI検索対応",
                  desc: "LLMO/AEO対策に最適。AI検索エンジンに正確な情報を提供。",
                },
                {
                  title: "HTMLスニペット出力",
                  desc: "scriptタグ付きのHTMLコードをワンクリックでコピー。そのまま貼り付け可能。",
                },
                {
                  title: "API提供",
                  desc: "REST APIとMCP Serverを提供。プログラムからの自動生成にも対応。",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-lg border border-white/10 bg-white/5 p-5"
                >
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-bold text-white">対応スキーマタイプ</h2>
            <div className="mt-4 rounded-lg border border-white/10 bg-white/5 p-6">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {[
                  { name: "FAQ", href: "/generate/faq" },
                  { name: "ローカルビジネス", href: "/generate/local-business" },
                  { name: "商品", href: "/generate/product" },
                  { name: "記事", href: "/generate/article" },
                  { name: "パンくずリスト", href: "/generate/breadcrumb" },
                  { name: "組織", href: "/generate/organization" },
                  { name: "Webサイト", href: "/generate/website" },
                  { name: "イベント", href: "/generate/event" },
                  { name: "ハウツー", href: "/generate/howto" },
                  { name: "求人", href: "/generate/job-posting" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm text-emerald-500 transition-colors duration-200 hover:text-emerald-400"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-bold text-white">API</h2>
            <div className="mt-4 space-y-3">
              <div className="rounded-lg border border-white/10 bg-white/5 p-5">
                <h3 className="font-semibold text-white">REST API</h3>
                <p className="mt-1 text-sm text-white/50">
                  <code className="rounded bg-white/10 px-1.5 py-0.5 text-emerald-400">
                    POST /api/generate
                  </code>
                  {" "}でJSON-LD構造化データをプログラムから生成。
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-5">
                <h3 className="font-semibold text-white">MCP Server</h3>
                <p className="mt-1 text-sm text-white/50">
                  <code className="rounded bg-white/10 px-1.5 py-0.5 text-emerald-400">
                    POST /api/mcp
                  </code>
                  {" "}でAIエージェント（Claude等）からツールとして直接接続可能。
                </p>
              </div>
            </div>
          </section>

          <section className="mt-12 rounded-lg border border-emerald-500/30 bg-white/5 p-8 text-center">
            <h2 className="text-xl font-bold text-white">
              構造化データの導入を始めよう
            </h2>
            <p className="mt-2 text-sm text-white/50">
              フォームに入力するだけ。30秒で完了。
            </p>
            <Link
              href="/types"
              className="mt-6 inline-flex h-12 items-center rounded-lg bg-emerald-500 px-8 text-base font-semibold text-black transition-all duration-200 hover:bg-emerald-400"
            >
              スキーマタイプを選ぶ
            </Link>
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
                name: "Schema AIについて",
                item: "https://schema.ezoai.jp/about",
              },
            ],
          }),
        }}
      />
    </div>
  );
}
