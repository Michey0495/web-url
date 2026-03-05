import { type SchemaTypeConfig } from "./schema-types";

export function generateSchemaJsonLd(
  schemaType: SchemaTypeConfig,
  formData: Record<string, string>
): string {
  switch (schemaType.id) {
    case "faq":
      return generateFAQ(formData);
    case "local-business":
      return generateLocalBusiness(formData);
    case "product":
      return generateProduct(formData);
    case "article":
      return generateArticle(formData);
    case "breadcrumb":
      return generateBreadcrumb(formData);
    case "organization":
      return generateOrganization(formData);
    case "website":
      return generateWebSite(formData);
    case "event":
      return generateEvent(formData);
    case "howto":
      return generateHowTo(formData);
    case "job-posting":
      return generateJobPosting(formData);
    default:
      return JSON.stringify(
        { "@context": "https://schema.org", "@type": schemaType.name },
        null,
        2
      );
  }
}

function generateFAQ(data: Record<string, string>): string {
  const lines = (data.faqContent || "").split("\n").filter((l) => l.trim());
  const questions: { question: string; answer: string }[] = [];

  let currentQ = "";
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.match(/^Q[:：]/i)) {
      currentQ = trimmed.replace(/^Q[:：]\s*/i, "");
    } else if (trimmed.match(/^A[:：]/i) && currentQ) {
      questions.push({
        question: currentQ,
        answer: trimmed.replace(/^A[:：]\s*/i, ""),
      });
      currentQ = "";
    }
  }

  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: questions.map((q) => ({
        "@type": "Question",
        name: q.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: q.answer,
        },
      })),
    },
    null,
    2
  );
}

function generateLocalBusiness(data: Record<string, string>): string {
  const result: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": data.businessType || "LocalBusiness",
    name: data.businessName,
    description: data.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: data.address,
      addressCountry: "JP",
    },
  };
  if (data.phone) result.telephone = data.phone;
  if (data.siteUrl) result.url = data.siteUrl;
  return JSON.stringify(result, null, 2);
}

function generateProduct(data: Record<string, string>): string {
  const result: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: data.productName,
    description: data.description,
    url: data.siteUrl,
    offers: {
      "@type": "Offer",
      price: data.price,
      priceCurrency: "JPY",
      availability: "https://schema.org/InStock",
    },
  };
  if (data.brand) {
    result.brand = { "@type": "Brand", name: data.brand };
  }
  return JSON.stringify(result, null, 2);
}

function generateArticle(data: Record<string, string>): string {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: data.title,
      description: data.description,
      author: { "@type": "Person", name: data.authorName },
      datePublished: data.publishDate,
      url: data.siteUrl,
    },
    null,
    2
  );
}

function generateBreadcrumb(data: Record<string, string>): string {
  const lines = (data.breadcrumbContent || "")
    .split("\n")
    .filter((l) => l.trim());
  const firstLine = lines[0] || "";
  const items = firstLine.split(/>/).map((s) => s.trim());

  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((name, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name,
        item: i === 0 ? data.siteUrl : `${data.siteUrl}/${name.toLowerCase()}`,
      })),
    },
    null,
    2
  );
}

function generateOrganization(data: Record<string, string>): string {
  const result: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: data.orgName,
    url: data.siteUrl,
    description: data.description,
  };
  if (data.address) {
    result.address = {
      "@type": "PostalAddress",
      streetAddress: data.address,
      addressCountry: "JP",
    };
  }
  return JSON.stringify(result, null, 2);
}

function generateWebSite(data: Record<string, string>): string {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: data.siteName,
      url: data.siteUrl,
      description: data.description,
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${data.siteUrl}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    null,
    2
  );
}

function generateEvent(data: Record<string, string>): string {
  const result: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: data.eventName,
    startDate: data.startDate,
    description: data.description,
    location: {
      "@type": "Place",
      name: data.location,
    },
  };
  if (data.siteUrl) result.url = data.siteUrl;
  return JSON.stringify(result, null, 2);
}

function generateHowTo(data: Record<string, string>): string {
  const lines = (data.steps || "").split("\n").filter((l) => l.trim());
  const steps = lines.map((line) => ({
    "@type": "HowToStep" as const,
    text: line.replace(/^\d+[.、)\]]\s*/, ""),
  }));

  const result: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: data.title,
    description: data.description,
    step: steps,
  };
  if (data.siteUrl) result.url = data.siteUrl;
  return JSON.stringify(result, null, 2);
}

function generateJobPosting(data: Record<string, string>): string {
  const result: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: data.jobTitle,
    description: data.description,
    datePosted: data.publishDate,
    hiringOrganization: {
      "@type": "Organization",
      name: data.companyName,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: data.location,
        addressCountry: "JP",
      },
    },
  };
  if (data.salary) {
    result.baseSalary = {
      "@type": "MonetaryAmount",
      currency: "JPY",
      value: data.salary,
    };
  }
  return JSON.stringify(result, null, 2);
}
