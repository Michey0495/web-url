export interface SchemaTypeConfig {
  id: string;
  name: string;
  nameJa: string;
  description: string;
  fields: SchemaField[];
  example: Record<string, unknown>;
}

export interface SchemaField {
  key: string;
  label: string;
  type: "text" | "textarea" | "url" | "number" | "date" | "select";
  required: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
}

export const SCHEMA_TYPES: SchemaTypeConfig[] = [
  {
    id: "faq",
    name: "FAQPage",
    nameJa: "FAQ（よくある質問）",
    description:
      "よくある質問と回答のページ。Googleの検索結果にリッチスニペットとして表示される。",
    fields: [
      {
        key: "siteName",
        label: "サイト名",
        type: "text",
        required: true,
        placeholder: "例: Schema AI",
      },
      {
        key: "siteUrl",
        label: "サイトURL",
        type: "url",
        required: true,
        placeholder: "https://example.com",
      },
      {
        key: "faqContent",
        label: "FAQ内容（質問と回答を記述）",
        type: "textarea",
        required: true,
        placeholder:
          "Q: 構造化データとは？\nA: Webページの内容を検索エンジンに伝えるためのマークアップです。\n\nQ: JSON-LDとは？\nA: 構造化データの記述形式の一つで、Googleが推奨しています。",
      },
    ],
    example: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "構造化データとは？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Webページの内容を検索エンジンに伝えるためのマークアップです。",
          },
        },
      ],
    },
  },
  {
    id: "local-business",
    name: "LocalBusiness",
    nameJa: "ローカルビジネス",
    description:
      "店舗・事業所の情報。Googleマップやローカル検索結果に表示される。",
    fields: [
      {
        key: "businessName",
        label: "事業所名",
        type: "text",
        required: true,
        placeholder: "例: 渋谷カフェ",
      },
      {
        key: "businessType",
        label: "業種",
        type: "select",
        required: true,
        options: [
          { value: "Restaurant", label: "レストラン" },
          { value: "Cafe", label: "カフェ" },
          { value: "Store", label: "店舗" },
          { value: "MedicalBusiness", label: "クリニック" },
          { value: "LegalService", label: "法律事務所" },
          { value: "FinancialService", label: "金融サービス" },
          { value: "EducationalOrganization", label: "教育機関" },
          { value: "LocalBusiness", label: "その他" },
        ],
      },
      {
        key: "address",
        label: "住所",
        type: "text",
        required: true,
        placeholder: "東京都渋谷区...",
      },
      {
        key: "phone",
        label: "電話番号",
        type: "text",
        required: false,
        placeholder: "03-1234-5678",
      },
      {
        key: "siteUrl",
        label: "WebサイトURL",
        type: "url",
        required: false,
        placeholder: "https://example.com",
      },
      {
        key: "description",
        label: "事業説明",
        type: "textarea",
        required: true,
        placeholder: "事業内容、特徴、サービス等を記述",
      },
    ],
    example: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "渋谷カフェ",
      address: {
        "@type": "PostalAddress",
        addressLocality: "渋谷区",
        addressRegion: "東京都",
        addressCountry: "JP",
      },
    },
  },
  {
    id: "product",
    name: "Product",
    nameJa: "商品",
    description:
      "商品情報の構造化データ。検索結果に価格、在庫状況、レビューが表示される。",
    fields: [
      {
        key: "productName",
        label: "商品名",
        type: "text",
        required: true,
        placeholder: "例: ワイヤレスイヤホン Pro",
      },
      {
        key: "description",
        label: "商品説明",
        type: "textarea",
        required: true,
        placeholder: "商品の特徴、機能、仕様等",
      },
      {
        key: "price",
        label: "価格（円）",
        type: "number",
        required: true,
        placeholder: "9800",
      },
      {
        key: "brand",
        label: "ブランド",
        type: "text",
        required: false,
        placeholder: "例: TechBrand",
      },
      {
        key: "siteUrl",
        label: "商品ページURL",
        type: "url",
        required: true,
        placeholder: "https://example.com/product/123",
      },
    ],
    example: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "ワイヤレスイヤホン Pro",
      offers: {
        "@type": "Offer",
        price: "9800",
        priceCurrency: "JPY",
      },
    },
  },
  {
    id: "article",
    name: "Article",
    nameJa: "記事",
    description:
      "ブログ記事やニュース記事の構造化データ。検索結果にリッチな記事表示。",
    fields: [
      {
        key: "title",
        label: "記事タイトル",
        type: "text",
        required: true,
        placeholder: "例: LLMO対策完全ガイド",
      },
      {
        key: "description",
        label: "記事概要",
        type: "textarea",
        required: true,
        placeholder: "記事の概要・内容",
      },
      {
        key: "authorName",
        label: "著者名",
        type: "text",
        required: true,
        placeholder: "例: 田中太郎",
      },
      {
        key: "publishDate",
        label: "公開日",
        type: "date",
        required: true,
      },
      {
        key: "siteUrl",
        label: "記事URL",
        type: "url",
        required: true,
        placeholder: "https://example.com/blog/article-1",
      },
    ],
    example: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "LLMO対策完全ガイド",
      author: { "@type": "Person", name: "田中太郎" },
    },
  },
  {
    id: "breadcrumb",
    name: "BreadcrumbList",
    nameJa: "パンくずリスト",
    description:
      "ページの階層構造を示すパンくずリスト。検索結果のURL表示が改善される。",
    fields: [
      {
        key: "siteUrl",
        label: "サイトURL",
        type: "url",
        required: true,
        placeholder: "https://example.com",
      },
      {
        key: "breadcrumbContent",
        label: "パンくず構造（階層を記述）",
        type: "textarea",
        required: true,
        placeholder:
          "ホーム > カテゴリ > サブカテゴリ > ページ名\n\n各階層のURLも記述してください",
      },
    ],
    example: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "ホーム",
          item: "https://example.com",
        },
      ],
    },
  },
  {
    id: "organization",
    name: "Organization",
    nameJa: "組織",
    description: "企業・団体の情報。ブランドのナレッジパネル表示に寄与。",
    fields: [
      {
        key: "orgName",
        label: "組織名",
        type: "text",
        required: true,
        placeholder: "例: 株式会社サンプル",
      },
      {
        key: "siteUrl",
        label: "WebサイトURL",
        type: "url",
        required: true,
        placeholder: "https://example.com",
      },
      {
        key: "description",
        label: "組織の説明",
        type: "textarea",
        required: true,
        placeholder: "事業内容、ミッション等",
      },
      {
        key: "address",
        label: "所在地",
        type: "text",
        required: false,
        placeholder: "東京都港区...",
      },
    ],
    example: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "株式会社サンプル",
      url: "https://example.com",
    },
  },
  {
    id: "website",
    name: "WebSite",
    nameJa: "Webサイト",
    description:
      "サイト全体の情報。サイトリンク検索ボックスの表示に必要。",
    fields: [
      {
        key: "siteName",
        label: "サイト名",
        type: "text",
        required: true,
        placeholder: "例: Schema AI",
      },
      {
        key: "siteUrl",
        label: "サイトURL",
        type: "url",
        required: true,
        placeholder: "https://example.com",
      },
      {
        key: "description",
        label: "サイトの説明",
        type: "textarea",
        required: true,
        placeholder: "サイトの概要、目的等",
      },
    ],
    example: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Schema AI",
      url: "https://schema.ezoai.jp",
    },
  },
  {
    id: "event",
    name: "Event",
    nameJa: "イベント",
    description:
      "イベント情報の構造化データ。検索結果に日時、場所、価格が表示される。",
    fields: [
      {
        key: "eventName",
        label: "イベント名",
        type: "text",
        required: true,
        placeholder: "例: AI活用セミナー2026",
      },
      {
        key: "startDate",
        label: "開始日",
        type: "date",
        required: true,
      },
      {
        key: "location",
        label: "場所",
        type: "text",
        required: true,
        placeholder: "東京ビッグサイト",
      },
      {
        key: "description",
        label: "イベント説明",
        type: "textarea",
        required: true,
        placeholder: "イベントの内容、対象者等",
      },
      {
        key: "siteUrl",
        label: "イベントページURL",
        type: "url",
        required: false,
        placeholder: "https://example.com/event",
      },
    ],
    example: {
      "@context": "https://schema.org",
      "@type": "Event",
      name: "AI活用セミナー2026",
      startDate: "2026-04-01",
    },
  },
  {
    id: "howto",
    name: "HowTo",
    nameJa: "ハウツー",
    description:
      "手順ガイドの構造化データ。検索結果にステップ表示される。",
    fields: [
      {
        key: "title",
        label: "ハウツータイトル",
        type: "text",
        required: true,
        placeholder: "例: JSON-LDの設置方法",
      },
      {
        key: "description",
        label: "概要",
        type: "textarea",
        required: true,
        placeholder: "手順の概要を記述",
      },
      {
        key: "steps",
        label: "手順（ステップごとに記述）",
        type: "textarea",
        required: true,
        placeholder:
          "1. HTMLファイルを開く\n2. <head>タグ内にscriptタグを追加\n3. JSON-LDコードを貼り付ける\n4. ファイルを保存して公開",
      },
      {
        key: "siteUrl",
        label: "ページURL",
        type: "url",
        required: false,
        placeholder: "https://example.com/howto",
      },
    ],
    example: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "JSON-LDの設置方法",
      step: [{ "@type": "HowToStep", text: "HTMLファイルを開く" }],
    },
  },
  {
    id: "job-posting",
    name: "JobPosting",
    nameJa: "求人",
    description:
      "求人情報の構造化データ。Google求人検索に表示される。",
    fields: [
      {
        key: "jobTitle",
        label: "職種名",
        type: "text",
        required: true,
        placeholder: "例: フロントエンドエンジニア",
      },
      {
        key: "companyName",
        label: "企業名",
        type: "text",
        required: true,
        placeholder: "例: 株式会社サンプル",
      },
      {
        key: "description",
        label: "求人詳細",
        type: "textarea",
        required: true,
        placeholder: "仕事内容、応募条件、待遇等",
      },
      {
        key: "salary",
        label: "給与（年収・月給等）",
        type: "text",
        required: false,
        placeholder: "例: 年収500万〜800万",
      },
      {
        key: "location",
        label: "勤務地",
        type: "text",
        required: true,
        placeholder: "東京都渋谷区",
      },
      {
        key: "publishDate",
        label: "掲載日",
        type: "date",
        required: true,
      },
    ],
    example: {
      "@context": "https://schema.org",
      "@type": "JobPosting",
      title: "フロントエンドエンジニア",
      hiringOrganization: {
        "@type": "Organization",
        name: "株式会社サンプル",
      },
    },
  },
];

export function getSchemaType(id: string): SchemaTypeConfig | undefined {
  return SCHEMA_TYPES.find((t) => t.id === id);
}
