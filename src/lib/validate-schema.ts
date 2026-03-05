export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

const REQUIRED_FIELDS: Record<string, string[]> = {
  FAQPage: ["mainEntity"],
  LocalBusiness: ["name", "address"],
  Product: ["name", "offers"],
  Article: ["headline", "author", "datePublished"],
  BreadcrumbList: ["itemListElement"],
  Organization: ["name", "url"],
  WebSite: ["name", "url"],
  Event: ["name", "startDate", "location"],
  HowTo: ["name", "step"],
  JobPosting: ["title", "description", "datePosted", "hiringOrganization"],
};

export function validateSchemaJsonLd(jsonLd: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(jsonLd);
  } catch {
    return { valid: false, errors: ["JSON構文エラー: 不正なJSON形式です"], warnings: [] };
  }

  if (parsed["@context"] !== "https://schema.org") {
    errors.push("@contextが未設定、またはhttps://schema.orgではありません");
  }

  const schemaType = parsed["@type"] as string | undefined;
  if (!schemaType) {
    errors.push("@typeが未設定です");
    return { valid: errors.length === 0, errors, warnings };
  }

  const required = REQUIRED_FIELDS[schemaType];
  if (required) {
    for (const field of required) {
      const value = parsed[field];
      if (value === undefined || value === null || value === "") {
        errors.push(`必須フィールド「${field}」が未設定です`);
      } else if (Array.isArray(value) && value.length === 0) {
        warnings.push(`「${field}」が空の配列です。1つ以上の要素を追加してください`);
      }
    }
  }

  if (schemaType === "FAQPage") {
    const mainEntity = parsed.mainEntity;
    if (Array.isArray(mainEntity) && mainEntity.length === 0) {
      errors.push("FAQが0件です。Q: / A: 形式で質問と回答を入力してください");
    }
  }

  if (schemaType === "HowTo") {
    const steps = parsed.step;
    if (Array.isArray(steps) && steps.length === 0) {
      errors.push("手順が0件です。番号付きリストで手順を入力してください");
    }
  }

  if (schemaType === "Product") {
    const offers = parsed.offers as Record<string, unknown> | undefined;
    if (offers && (!offers.price || offers.price === "0")) {
      warnings.push("価格が0円です。正しい価格を入力してください");
    }
  }

  if (schemaType === "Article") {
    const headline = parsed.headline as string | undefined;
    if (headline && headline.length > 110) {
      warnings.push(`headlineが${headline.length}文字です。110文字以内を推奨します`);
    }
  }

  const urlFields = ["url", "siteUrl"];
  for (const field of urlFields) {
    const val = parsed[field];
    if (typeof val === "string" && val && !val.startsWith("https://")) {
      warnings.push(`「${field}」はhttps://で始まるURLを推奨します`);
    }
  }

  return { valid: errors.length === 0, errors, warnings };
}
