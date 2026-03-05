import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SchemaGeneratorForm } from "@/components/schema-generator-form";
import { SCHEMA_TYPES, getSchemaType } from "@/lib/schema-types";

interface PageProps {
  params: Promise<{ type: string }>;
}

export async function generateStaticParams() {
  return SCHEMA_TYPES.map((t) => ({ type: t.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { type } = await params;
  const schema = getSchemaType(type);
  if (!schema) return {};
  return {
    title: `${schema.nameJa}の構造化データを生成 | ${schema.name} JSON-LD`,
    description: `${schema.nameJa}（${schema.name}）のJSON-LD構造化データをAIが自動生成。${schema.description}`,
    alternates: { canonical: `https://schema.ezoai.jp/generate/${type}` },
  };
}

export default async function GeneratePage({ params }: PageProps) {
  const { type } = await params;
  const schema = getSchemaType(type);
  if (!schema) notFound();

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
            <span className="text-white">{schema.nameJa}</span>
          </nav>

          <h1 className="text-3xl font-bold text-white">
            {schema.nameJa}
            <span className="ml-3 text-lg text-emerald-500">
              {schema.name}
            </span>
          </h1>
          <p className="mt-3 text-base leading-relaxed text-white/70">
            {schema.description}
          </p>

          <div className="mt-8">
            <SchemaGeneratorForm schemaType={schema} />
          </div>

          <section className="mt-16">
            <h2 className="mb-4 text-xl font-bold text-white">
              {schema.nameJa}とは
            </h2>
            <div className="rounded-lg border border-white/10 bg-white/5 p-6">
              <p className="text-sm leading-relaxed text-white/70">
                {schema.name}
                は、Schema.orgで定義されている構造化データタイプの一つです。
                このタイプの構造化データをWebページに設置することで、
                検索エンジンがページの内容をより正確に理解できるようになります。
                Google検索のリッチリザルト表示やAI検索での情報抽出に活用されます。
              </p>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="mb-4 text-xl font-bold text-white">
              JSON-LDコード例
            </h2>
            <pre className="overflow-x-auto rounded-lg border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-emerald-400">
              <code>{JSON.stringify(schema.example, null, 2)}</code>
            </pre>
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
                name: schema.nameJa,
                item: `https://schema.ezoai.jp/generate/${type}`,
              },
            ],
          }),
        }}
      />
    </div>
  );
}
