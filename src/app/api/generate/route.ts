import { NextRequest, NextResponse } from "next/server";
import { getSchemaType } from "@/lib/schema-types";
import { generateSchemaJsonLd } from "@/lib/generate-schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body as {
      type: string;
      data: Record<string, string>;
    };

    if (!type || !data) {
      return NextResponse.json(
        { error: "type と data は必須です" },
        { status: 400 }
      );
    }

    const schemaType = getSchemaType(type);
    if (!schemaType) {
      return NextResponse.json(
        { error: `不明なスキーマタイプ: ${type}` },
        { status: 400 }
      );
    }

    const missingFields = schemaType.fields
      .filter((f) => f.required && !data[f.key])
      .map((f) => f.label);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `必須フィールドが未入力です: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    const jsonLd = generateSchemaJsonLd(schemaType, data);

    return NextResponse.json({
      success: true,
      type: schemaType.name,
      jsonLd,
      htmlSnippet: `<script type="application/ld+json">\n${jsonLd}\n</script>`,
    });
  } catch {
    return NextResponse.json(
      { error: "リクエストの処理に失敗しました" },
      { status: 500 }
    );
  }
}
