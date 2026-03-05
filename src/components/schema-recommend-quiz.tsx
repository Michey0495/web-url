"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Question {
  id: string;
  text: string;
  options: { label: string; value: string }[];
}

const QUESTIONS: Question[] = [
  {
    id: "site_type",
    text: "あなたのWebサイトはどんなタイプですか？",
    options: [
      { label: "企業・団体の公式サイト", value: "corporate" },
      { label: "ECサイト・ネットショップ", value: "ec" },
      { label: "ブログ・メディアサイト", value: "blog" },
      { label: "店舗・サービスのサイト", value: "local" },
      { label: "求人・採用サイト", value: "recruit" },
      { label: "イベント・セミナーサイト", value: "event" },
    ],
  },
  {
    id: "goal",
    text: "一番の目的は何ですか？",
    options: [
      { label: "検索結果でリッチスニペットを表示したい", value: "rich" },
      { label: "AI検索（ChatGPT等）に情報を正しく伝えたい", value: "ai" },
      { label: "ローカル検索（Googleマップ等）で上位表示したい", value: "local" },
      { label: "Google求人検索に掲載したい", value: "job" },
      { label: "サイトの信頼性・権威性を向上させたい", value: "trust" },
    ],
  },
  {
    id: "content",
    text: "主に掲載しているコンテンツは？",
    options: [
      { label: "FAQ・よくある質問", value: "faq" },
      { label: "商品・製品情報", value: "product" },
      { label: "記事・ニュース", value: "article" },
      { label: "手順・ガイド", value: "howto" },
      { label: "店舗・施設の情報", value: "business" },
      { label: "イベント・求人の情報", value: "event_job" },
    ],
  },
];

interface Recommendation {
  primary: string;
  secondary: string[];
  reason: string;
}

function getRecommendation(answers: Record<string, string>): Recommendation {
  const { site_type, goal, content } = answers;

  if (content === "faq" || (goal === "rich" && site_type === "corporate")) {
    return {
      primary: "faq",
      secondary: ["website", "organization"],
      reason:
        "FAQPageはリッチスニペットの獲得率が高く、CTR向上に即効性があります。企業サイトならWebSiteとOrganizationも併せて設置しましょう。",
    };
  }

  if (site_type === "ec" || content === "product") {
    return {
      primary: "product",
      secondary: ["breadcrumb", "faq", "organization"],
      reason:
        "商品情報の構造化データで検索結果に価格・在庫が表示されます。パンくずリストとFAQも併せて設置するとSEO効果が高まります。",
    };
  }

  if (site_type === "local" || goal === "local" || content === "business") {
    return {
      primary: "local-business",
      secondary: ["faq", "organization"],
      reason:
        "ローカルビジネス構造化データでGoogleマップ・ローカル検索での上位表示が期待できます。FAQも併せて設置するとリッチリザルトが充実します。",
    };
  }

  if (site_type === "blog" || content === "article") {
    return {
      primary: "article",
      secondary: ["breadcrumb", "faq", "organization"],
      reason:
        "記事の構造化データでGoogle DiscoverやAI検索での露出が向上します。パンくずリストでサイト構造も伝えましょう。",
    };
  }

  if (site_type === "recruit" || goal === "job" || content === "event_job") {
    return {
      primary: "job-posting",
      secondary: ["organization", "website"],
      reason:
        "求人構造化データでGoogle for Jobs（求人検索）への掲載が可能になります。企業情報も併せて設置しましょう。",
    };
  }

  if (site_type === "event" || content === "event_job") {
    return {
      primary: "event",
      secondary: ["organization", "breadcrumb"],
      reason:
        "イベント構造化データでGoogle検索のイベントリスティングに掲載されます。集客力が大幅に向上します。",
    };
  }

  if (content === "howto") {
    return {
      primary: "howto",
      secondary: ["faq", "breadcrumb"],
      reason:
        "ハウツー構造化データで検索結果にステップ表示され、手順ガイドの露出が向上します。",
    };
  }

  if (goal === "trust" || site_type === "corporate") {
    return {
      primary: "organization",
      secondary: ["website", "faq"],
      reason:
        "Organization構造化データでGoogleのナレッジパネル表示が期待できます。WebSiteと併用してサイト全体の信頼性を向上させましょう。",
    };
  }

  return {
    primary: "faq",
    secondary: ["website", "organization"],
    reason:
      "まずはFAQPageから始めましょう。リッチスニペット獲得率が高く、あらゆるサイトに効果的です。",
  };
}

const TYPE_NAMES: Record<string, { nameJa: string; name: string }> = {
  faq: { nameJa: "FAQ（よくある質問）", name: "FAQPage" },
  "local-business": { nameJa: "ローカルビジネス", name: "LocalBusiness" },
  product: { nameJa: "商品", name: "Product" },
  article: { nameJa: "記事", name: "Article" },
  breadcrumb: { nameJa: "パンくずリスト", name: "BreadcrumbList" },
  organization: { nameJa: "組織", name: "Organization" },
  website: { nameJa: "Webサイト", name: "WebSite" },
  event: { nameJa: "イベント", name: "Event" },
  howto: { nameJa: "ハウツー", name: "HowTo" },
  "job-posting": { nameJa: "求人", name: "JobPosting" },
};

export function SchemaRecommendQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<Recommendation | null>(null);

  function handleAnswer(value: string) {
    const question = QUESTIONS[currentStep];
    const newAnswers = { ...answers, [question.id]: value };
    setAnswers(newAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setResult(getRecommendation(newAnswers));
    }
  }

  function handleReset() {
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
  }

  if (result) {
    const primary = TYPE_NAMES[result.primary];
    return (
      <div className="space-y-6">
        <div className="rounded-lg border border-emerald-500/30 bg-white/5 p-6">
          <p className="mb-2 text-sm font-medium text-emerald-500">
            あなたにおすすめのスキーマタイプ
          </p>
          <h2 className="text-2xl font-bold text-white">
            {primary?.nameJa}
            <span className="ml-2 text-base text-emerald-500">
              {primary?.name}
            </span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            {result.reason}
          </p>
          <Link
            href={`/generate/${result.primary}`}
            className="mt-6 inline-flex h-12 items-center rounded-lg bg-emerald-500 px-8 text-base font-semibold text-black transition-all duration-200 hover:bg-emerald-400"
          >
            {primary?.nameJa}を生成する
          </Link>
        </div>

        {result.secondary.length > 0 && (
          <div>
            <h3 className="mb-3 text-lg font-semibold text-white">
              併せて設置を推奨
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {result.secondary.map((id) => {
                const type = TYPE_NAMES[id];
                return (
                  <Link
                    key={id}
                    href={`/generate/${id}`}
                    className="group cursor-pointer rounded-lg border border-white/10 bg-white/5 p-4 transition-all duration-200 hover:border-emerald-500/30 hover:bg-white/10"
                  >
                    <p className="font-semibold text-white">{type?.nameJa}</p>
                    <p className="mt-1 text-xs text-emerald-500">
                      {type?.name}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        <Button
          onClick={handleReset}
          variant="outline"
          className="border-white/10 text-white transition-all duration-200 hover:bg-white/10"
        >
          もう一度診断する
        </Button>
      </div>
    );
  }

  const question = QUESTIONS[currentStep];
  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {QUESTIONS.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full ${
              i <= currentStep ? "bg-emerald-500" : "bg-white/10"
            }`}
          />
        ))}
      </div>

      <p className="text-sm text-white/50">
        質問 {currentStep + 1} / {QUESTIONS.length}
      </p>

      <h2 className="text-xl font-bold text-white">{question.text}</h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {question.options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => handleAnswer(opt.value)}
            className="cursor-pointer rounded-lg border border-white/10 bg-white/5 px-5 py-4 text-left text-sm font-medium text-white transition-all duration-200 hover:border-emerald-500/30 hover:bg-white/10"
          >
            {opt.label}
          </button>
        ))}
      </div>

      {currentStep > 0 && (
        <button
          onClick={() => setCurrentStep(currentStep - 1)}
          className="text-sm text-white/50 transition-colors duration-200 hover:text-white"
        >
          前の質問に戻る
        </button>
      )}
    </div>
  );
}
