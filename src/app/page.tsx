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
          <p className="mb-4 text-sm font-medium tracking-wide text-emerald-500">
            無料 / 登録不要 / 30秒で生成
          </p>
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
            構造化データ、
            <span className="text-emerald-500">AIにおまかせ</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
            2026年、AI検索が主流になった今、
            構造化データのないサイトはAIに見つけてもらえない。
            Schema.org準拠のJSON-LDを、フォーム入力だけで自動生成。
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/40">
            Google公式推奨のJSON-LD形式に完全対応。リッチスニペット表示でCTR最大30%向上。
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/generate/faq"
              className="inline-flex h-12 items-center rounded-lg bg-emerald-500 px-8 text-base font-semibold text-black transition-all duration-200 hover:bg-emerald-400"
            >
              無料で生成する
            </Link>
            <Link
              href="/types"
              className="inline-flex h-12 items-center rounded-lg border border-white/20 px-8 text-base font-semibold text-white transition-all duration-200 hover:border-white/40 hover:bg-white/5"
            >
              10タイプを見る
            </Link>
          </div>
          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-white/40">
            <div>
              <span className="block text-2xl font-bold text-white">10</span>
              スキーマタイプ
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <span className="block text-2xl font-bold text-white">30秒</span>
              で生成完了
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <span className="block text-2xl font-bold text-white">0円</span>
              完全無料
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 pb-12">
          <div className="mx-auto max-w-3xl rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-6 text-center">
            <p className="text-sm font-medium text-emerald-400">
              日本のWebサイトの構造化データ導入率はわずか約30%
            </p>
            <p className="mt-2 text-sm text-white/50">
              今導入すれば、競合サイトより検索結果で目立てる。AI検索時代の先行者優位を獲得しよう。
            </p>
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
            <h2 className="mb-4 text-center text-2xl font-bold text-white">
              なぜ構造化データが必要なのか
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-center text-sm leading-relaxed text-white/50">
              Google検索もAI検索も、構造化データを読んでいる。対応しないサイトは検索結果から消えていく。
            </p>
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
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="mb-4 text-center text-2xl font-bold text-white">
              構造化データの有無でこう変わる
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-center text-sm text-white/50">
              Google検索結果での表示の違い
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                <p className="mb-4 text-sm font-semibold text-red-400">
                  構造化データなし
                </p>
                <div className="space-y-3 rounded border border-white/10 bg-black/50 p-4">
                  <p className="text-sm text-blue-400">
                    渋谷カフェ - トップページ
                  </p>
                  <p className="text-xs text-emerald-600">
                    https://example.com
                  </p>
                  <p className="text-xs leading-relaxed text-white/40">
                    渋谷にあるカフェです。コーヒーやスイーツを提供しています...
                  </p>
                </div>
                <p className="mt-3 text-xs text-white/30">
                  通常の検索結果のみ。情報量が少なくCTRが低い。
                </p>
              </div>
              <div className="rounded-lg border border-emerald-500/30 bg-white/5 p-6">
                <p className="mb-4 text-sm font-semibold text-emerald-400">
                  構造化データあり
                </p>
                <div className="space-y-3 rounded border border-white/10 bg-black/50 p-4">
                  <p className="text-sm text-blue-400">
                    渋谷カフェ - オーガニックコーヒー専門店
                  </p>
                  <p className="text-xs text-emerald-600">
                    https://example.com
                  </p>
                  <p className="text-xs leading-relaxed text-white/40">
                    渋谷駅徒歩3分のオーガニックコーヒー専門店...
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs">
                    <span className="rounded bg-white/10 px-2 py-1 text-white/60">
                      営業: 8:00-22:00
                    </span>
                    <span className="rounded bg-white/10 px-2 py-1 text-white/60">
                      渋谷区神南1-2-3
                    </span>
                    <span className="rounded bg-white/10 px-2 py-1 text-white/60">
                      03-1234-5678
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-white/30">
                  リッチリザルト表示。CTRが平均20-30%向上。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 py-20">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="mb-8 text-center text-2xl font-bold text-white">
              こんな方に最適
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: "Web担当者", desc: "SEO対策の一環として構造化データを導入したい" },
                { title: "ECサイト運営者", desc: "商品情報をGoogle検索で目立たせたい" },
                { title: "ブロガー", desc: "記事やFAQのリッチスニペットを獲得したい" },
                { title: "マーケター", desc: "LLMO/AEO対策でAI検索時代に備えたい" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-lg border border-white/10 bg-white/5 p-5"
                >
                  <h3 className="text-base font-semibold text-white">
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
                  a: "はい、完全無料です。登録不要で、制限なくすべての機能をお使いいただけます。",
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
        <section className="border-t border-white/10 py-20">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="text-2xl font-bold text-white">
              あなたのサイトも、AI検索に対応しよう
            </h2>
            <p className="mt-4 text-base text-white/50">
              構造化データの導入に専門知識は不要。
              フォームに入力するだけで、Schema.org準拠のJSON-LDが手に入る。
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/generate/faq"
                className="inline-flex h-12 items-center rounded-lg bg-emerald-500 px-8 text-base font-semibold text-black transition-all duration-200 hover:bg-emerald-400"
              >
                無料で生成する
              </Link>
              <Link
                href="/recommend"
                className="inline-flex h-12 items-center rounded-lg border border-white/20 px-8 text-base font-semibold text-white transition-all duration-200 hover:border-white/40 hover:bg-white/5"
              >
                どのタイプが必要？診断する
              </Link>
            </div>
            <p className="mt-6 text-xs text-white/30">
              登録不要 / クレジットカード不要 / 制限なし
            </p>
          </div>
        </section>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "構造化データ（JSON-LD）を自動生成する方法",
            description:
              "Schema AIを使ってSchema.org準拠のJSON-LD構造化データを30秒で生成する手順",
            totalTime: "PT30S",
            tool: {
              "@type": "HowToTool",
              name: "Schema AI",
            },
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "スキーマタイプを選択",
                text: "FAQ、商品、ローカルビジネスなど10種類のスキーマタイプから用途に合ったものを選択します。",
                url: "https://schema.ezoai.jp/types",
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "フォームに情報を入力",
                text: "表示されるフォームに沿って、サイト名やコンテンツ情報を入力します。",
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "JSON-LDコードをコピー",
                text: "生成されたJSON-LDコードをコピーボタンでクリップボードにコピーし、HTMLのheadタグ内に貼り付けます。",
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
