export interface SchemaTypeConfig {
  id: string;
  name: string;
  nameJa: string;
  description: string;
  longDescription: string;
  useCases: string[];
  tips: string[];
  relatedTypes: string[];
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
    longDescription:
      "FAQPage構造化データは、よくある質問と回答をSchema.orgの仕様に基づいてマークアップするものです。Google検索結果にアコーディオン形式のリッチスニペットとして表示され、検索結果の表示面積が大幅に拡大します。CTR（クリック率）が平均20〜30%向上するというデータもあり、SEO対策として最も即効性の高い構造化データの一つです。AI検索エンジン（ChatGPT、Perplexity等）でも、FAQPage構造化データを持つページは情報源として優先的に引用される傾向があります。",
    useCases: [
      "企業サイトのFAQページ",
      "ECサイトの商品に関するよくある質問",
      "サービスの料金・機能に関するQ&A",
      "医療・法律等の専門Q&Aコンテンツ",
    ],
    tips: [
      "質問と回答は具体的かつ簡潔に記述する",
      "1ページあたり5〜10個のFAQが最適",
      "回答には関連ページへの内部リンクを含めるとSEO効果が高い",
      "定期的に内容を更新し、最新情報を反映する",
    ],
    relatedTypes: ["website", "organization", "howto"],
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
    longDescription:
      "LocalBusiness構造化データは、店舗や事業所の基本情報をGoogleに伝えるためのマークアップです。Googleマップ、ローカルパック（地図付き検索結果）、ナレッジパネルに情報が表示されるようになります。「近くの〇〇」「〇〇 営業時間」といったローカル検索クエリでの上位表示に直結します。飲食店、美容室、クリニック、士業事務所など、地域密着型ビジネスには必須の構造化データです。",
    useCases: [
      "飲食店・カフェの店舗情報",
      "美容室・サロンの事業所情報",
      "クリニック・病院の施設情報",
      "法律事務所・会計事務所の事業所情報",
    ],
    tips: [
      "Googleビジネスプロフィールの情報と完全一致させる",
      "営業時間、電話番号、住所は正確に記載する",
      "業種に合ったサブタイプ（Restaurant、Cafe等）を選択する",
      "複数店舗がある場合は各店舗ごとに個別に設置する",
    ],
    relatedTypes: ["organization", "event", "faq"],
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
    longDescription:
      "Product構造化データは、ECサイトの商品情報を検索エンジンに伝えるためのマークアップです。Google検索結果に価格、在庫状況、レビュー評価が直接表示されるリッチリザルトを獲得できます。Googleショッピングへの掲載にも寄与し、EC事業者にとって売上に直結する最重要の構造化データです。商品名、価格、ブランド、在庫情報を正確にマークアップすることで、購買意欲の高いユーザーからのクリックを獲得できます。",
    useCases: [
      "ECサイトの商品詳細ページ",
      "比較サイトの商品紹介ページ",
      "メーカーの製品情報ページ",
      "アフィリエイトの商品レビューページ",
    ],
    tips: [
      "価格は税込み表示を推奨（Googleの方針に準拠）",
      "在庫状況（InStock/OutOfStock）を正確に反映する",
      "商品画像のURLも含めるとリッチリザルトが充実する",
      "レビュー・評価がある場合はAggregateRatingも追加する",
    ],
    relatedTypes: ["breadcrumb", "faq", "organization"],
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
    longDescription:
      "Article構造化データは、ブログ記事やニュース記事のメタ情報を検索エンジンに伝えるマークアップです。Google検索のトップニュースやDiscoverフィードに表示されやすくなり、記事コンテンツの露出を大幅に向上させます。著者情報、公開日、更新日を正確にマークアップすることで、E-E-A-T（経験・専門性・権威性・信頼性）シグナルとしても機能します。AI検索では記事の信頼性評価に構造化データが活用されています。",
    useCases: [
      "企業ブログの記事ページ",
      "ニュースサイトの記事ページ",
      "技術ブログ・ナレッジベース",
      "コラム・オピニオン記事",
    ],
    tips: [
      "headlineは110文字以内を推奨（Google表示の制約）",
      "著者情報はPerson型で具体的な人名を使う",
      "datePublishedとdateModifiedを両方設定する",
      "記事内容と一致するdescriptionを記述する",
    ],
    relatedTypes: ["breadcrumb", "organization", "faq"],
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
    longDescription:
      "BreadcrumbList構造化データは、Webページの階層構造（パンくずリスト）を検索エンジンに伝えるマークアップです。Google検索結果のURL部分がパンくず形式で表示され、ユーザーがサイト構造を視覚的に理解できます。大規模サイトやECサイトでは特に効果が高く、サイト内の回遊率向上にも寄与します。他の構造化データ（Product、Article等）と組み合わせて使用することで、より充実したリッチリザルトを獲得できます。",
    useCases: [
      "ECサイトのカテゴリ階層",
      "企業サイトのセクション階層",
      "ブログのカテゴリ・タグ階層",
      "ドキュメントサイトの章立て",
    ],
    tips: [
      "各階層のURLは実際にアクセス可能なページを指定する",
      "トップページ（ホーム）を最初の階層に含める",
      "3〜5階層が最適、深すぎる階層は避ける",
      "日本語のページ名を使用してユーザーに分かりやすくする",
    ],
    relatedTypes: ["article", "product", "website"],
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
    longDescription:
      "Organization構造化データは、企業や団体の基本情報を検索エンジンに伝えるマークアップです。Googleのナレッジパネル（検索結果右側の企業情報カード）に表示される情報の根拠となります。企業名、ロゴ、所在地、連絡先、ソーシャルメディアリンクなどを正確にマークアップすることで、ブランドの信頼性と認知度が向上します。すべてのWebサイトに設置すべき基本的な構造化データの一つです。",
    useCases: [
      "企業の公式サイトトップページ",
      "団体・NPOの紹介ページ",
      "教育機関のWebサイト",
      "政府・自治体の公式サイト",
    ],
    tips: [
      "ロゴ画像は112x112px以上の正方形を推奨",
      "公式SNSアカウントのURLをsameAsに含める",
      "Googleビジネスプロフィールの情報と一致させる",
      "トップページに設置し、全ページで参照できるようにする",
    ],
    relatedTypes: ["website", "local-business", "article"],
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
    longDescription:
      "WebSite構造化データは、Webサイト全体の情報を検索エンジンに伝えるマークアップです。Googleのサイトリンク検索ボックス（検索結果にサイト内検索フォームが表示される機能）の獲得に必要です。サイト名、URL、検索機能の情報をマークアップすることで、ブランド検索時の表示が大幅に改善されます。Organization構造化データと併用することで、サイト全体の信頼性シグナルが強化されます。",
    useCases: [
      "企業の公式サイト",
      "Webサービスのトップページ",
      "メディアサイト・ブログ",
      "ECサイトのトップページ",
    ],
    tips: [
      "サイトのトップページにのみ設置する",
      "SearchActionを含めてサイト内検索を有効化する",
      "Organization構造化データと併用する",
      "正規URLをcanonicalと一致させる",
    ],
    relatedTypes: ["organization", "faq", "breadcrumb"],
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
    longDescription:
      "Event構造化データは、セミナー、コンサート、展示会などのイベント情報を検索エンジンに伝えるマークアップです。Google検索のイベントリスティング（日時・場所・価格付きの一覧表示）に掲載され、「今週末のイベント」「近くのセミナー」等の検索クエリで上位表示されます。開始日時、場所、説明を正確にマークアップすることで、集客力が大幅に向上します。オンラインイベントにも対応しています。",
    useCases: [
      "セミナー・ウェビナーの告知ページ",
      "コンサート・ライブの情報ページ",
      "展示会・カンファレンスの公式サイト",
      "地域イベント・お祭りの案内ページ",
    ],
    tips: [
      "開始日時はISO 8601形式（YYYY-MM-DD）で記載する",
      "オンラインイベントの場合はVirtualLocationを使用する",
      "チケット情報がある場合はOffersも含める",
      "イベント終了後はページを削除せず、過去イベントとして残す",
    ],
    relatedTypes: ["local-business", "organization", "howto"],
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
    longDescription:
      "HowTo構造化データは、手順やガイドの情報を検索エンジンに伝えるマークアップです。Google検索でステップバイステップのリッチリザルトとして表示され、「〇〇のやり方」「〇〇の方法」といったハウツー系キーワードで高い効果を発揮します。各ステップの説明、必要な道具、所要時間などを含めることで、ユーザーにとって有用な検索結果を提供できます。AI検索でもハウツーコンテンツは頻繁に引用されます。",
    useCases: [
      "料理レシピの手順ページ",
      "DIY・修理の手順ガイド",
      "ソフトウェアの操作手順",
      "申請・手続きの流れ説明",
    ],
    tips: [
      "各ステップは具体的で実行可能な内容にする",
      "ステップ数は3〜10個が最適",
      "所要時間（totalTime）を含めるとユーザーに親切",
      "画像付きのステップはよりリッチな表示になる",
    ],
    relatedTypes: ["faq", "article", "breadcrumb"],
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
    longDescription:
      "JobPosting構造化データは、求人情報をGoogleの求人検索（Google for Jobs）に掲載するためのマークアップです。職種名、企業名、給与、勤務地、雇用形態などを構造化することで、Google検索の求人専用UIに表示されます。求人サイトや企業の採用ページに設置することで、求職者からの応募数が大幅に増加します。Googleは有効期限切れの求人を自動的に非表示にするため、datePostedの正確な設定が重要です。",
    useCases: [
      "企業の採用ページ",
      "求人サイトの求人詳細ページ",
      "人材紹介会社の案件ページ",
      "アルバイト・パートの募集ページ",
    ],
    tips: [
      "職種名には社内用語でなく一般的な名称を使う",
      "給与は具体的な金額レンジを記載する",
      "validThroughで求人の有効期限を設定する",
      "雇用形態（正社員、契約、パート等）を明示する",
    ],
    relatedTypes: ["organization", "local-business", "website"],
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
