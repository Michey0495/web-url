import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SCHEMA_TYPES } from "@/lib/schema-types";

export const metadata: Metadata = {
  title: "Schema AI - AI構造化データジェネレーター | JSON-LD自動生成",
  description:
    "AIがSchema.org準拠のJSON-LD構造化データを自動生成。FAQ、商品、ローカルビジネスなど10タイプ対応。LLMO/AEO時代のSEO対策を無料で。",
  alternates: { canonical: "https://schema.ezoai.jp" },
};

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-4 py-20 text-center">
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
            構造化データ、
            <span className="text-emerald-500">AIにおまかせ</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
            Schema.org準拠のJSON-LD構造化データをAIが自動生成。
            スキーマタイプを選んで情報を入力するだけ。
            LLMO/AEO時代のSEO対策を、誰でも簡単に。
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/generate/faq"
              className="inline-flex h-12 items-center rounded-lg bg-emerald-500 px-8 text-base font-semibold text-black transition-all duration-200 hover:bg-emerald-400"
            >
              無料で生成する
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 pb-20">
          <h2 className="mb-8 text-center text-2xl font-bold text-white">
            対応スキーマタイプ
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SCHEMA_TYPES.map((type) => (
              <Link
                key={type.id}
                href={`/generate/${type.id}`}
                className="group cursor-pointer rounded-lg border border-white/10 bg-white/5 p-6 transition-all duration-200 hover:border-emerald-500/30 hover:bg-white/10"
              >
                <h3 className="text-lg font-semibold text-white">
                  {type.nameJa}
                </h3>
                <p className="mt-1 text-sm text-emerald-500">{type.name}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/50">
                  {type.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-t border-white/10 py-20">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="mb-8 text-center text-2xl font-bold text-white">
              3ステップで構造化データを生成
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "タイプを選択",
                  desc: "FAQ、商品、ローカルビジネスなど10種類のスキーマタイプから選択",
                },
                {
                  step: "02",
                  title: "情報を入力",
                  desc: "フォームに沿ってサイト情報やコンテンツを入力",
                },
                {
                  step: "03",
                  title: "コードをコピー",
                  desc: "生成されたJSON-LDコードをコピーしてHTMLに貼り付け",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="rounded-lg border border-white/10 bg-white/5 p-6"
                >
                  <span className="text-3xl font-bold text-emerald-500">
                    {item.step}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 py-20">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="mb-8 text-center text-2xl font-bold text-white">
              なぜ構造化データが必要なのか
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {[
                {
                  title: "リッチスニペット表示",
                  desc: "検索結果にFAQ、レビュー、価格などが直接表示され、CTRが最大30%向上",
                },
                {
                  title: "AI検索対応",
                  desc: "ChatGPT、Perplexity等のAI検索では、構造化データを持つページが優先的に情報源として使用される",
                },
                {
                  title: "LLMO/AEO対策",
                  desc: "2026年最注目のデジタルマーケティング施策。構造化データはLLMO/AEOの基盤技術",
                },
                {
                  title: "Google推奨",
                  desc: "GoogleはJSON-LD形式の構造化データを公式に推奨。30種以上のリッチリザルトに対応",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-lg border border-white/10 bg-white/5 p-6"
                >
                  <h3 className="text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 py-20">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="mb-8 text-center text-2xl font-bold text-white">
              よくある質問
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "構造化データとは何ですか？",
                  a: "Webページの内容を検索エンジンやAIが理解しやすい形式で記述するマークアップです。Schema.orgの仕様に準拠したJSON-LD形式が最も広く使われています。",
                },
                {
                  q: "JSON-LDはどこに設置しますか？",
                  a: 'HTMLの<head>タグ内に<script type="application/ld+json">タグで設置します。生成されたコードをコピーして貼り付けるだけです。',
                },
                {
                  q: "無料で使えますか？",
                  a: "はい。1日3回まで無料で構造化データを生成できます。登録不要ですぐにお使いいただけます。",
                },
                {
                  q: "LLMO/AEOとは何ですか？",
                  a: "LLMO（Large Language Model Optimization）はAI検索エンジンに自サイトを最適化する施策です。AEO（AI Engine Optimization）も同義で使われます。構造化データはその基盤技術の一つです。",
                },
              ].map((item) => (
                <div
                  key={item.q}
                  className="rounded-lg border border-white/10 bg-white/5 p-6"
                >
                  <h3 className="font-semibold text-white">{item.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Schema AI",
            url: "https://schema.ezoai.jp",
            description:
              "AIが自動でSchema.org準拠のJSON-LD構造化データを生成するツール",
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate:
                  "https://schema.ezoai.jp/generate/{schema_type}",
              },
              "query-input": "required name=schema_type",
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Schema AI",
            url: "https://schema.ezoai.jp",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "JPY",
            },
            description:
              "Schema.org準拠のJSON-LD構造化データをAIが自動生成する無料Webツール。FAQ、商品、ローカルビジネスなど10タイプ対応。",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "構造化データとは何ですか？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Webページの内容を検索エンジンやAIが理解しやすい形式で記述するマークアップです。",
                },
              },
              {
                "@type": "Question",
                name: "JSON-LDはどこに設置しますか？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: 'HTMLの<head>タグ内に<script type="application/ld+json">タグで設置します。',
                },
              },
              {
                "@type": "Question",
                name: "LLMO/AEOとは何ですか？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "LLMO（Large Language Model Optimization）はAI検索エンジンに自サイトを最適化する施策です。構造化データはその基盤技術の一つです。",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
