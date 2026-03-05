import { NextRequest, NextResponse } from "next/server";
import { SCHEMA_TYPES, getSchemaType } from "@/lib/schema-types";
import { generateSchemaJsonLd } from "@/lib/generate-schema";

interface JsonRpcRequest {
  jsonrpc: string;
  id: string | number;
  method: string;
  params?: Record<string, unknown>;
}

function jsonRpcResponse(id: string | number, result: unknown) {
  return NextResponse.json({ jsonrpc: "2.0", id, result });
}

function jsonRpcError(
  id: string | number | null,
  code: number,
  message: string
) {
  return NextResponse.json({
    jsonrpc: "2.0",
    id,
    error: { code, message },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as JsonRpcRequest;

    if (body.jsonrpc !== "2.0" || !body.method) {
      return jsonRpcError(body.id || null, -32600, "Invalid Request");
    }

    switch (body.method) {
      case "tools/list":
        return jsonRpcResponse(body.id, {
          tools: [
            {
              name: "generate_schema",
              description:
                "Schema.org準拠のJSON-LD構造化データを生成します。スキーマタイプと必要な情報を指定してください。",
              inputSchema: {
                type: "object",
                properties: {
                  type: {
                    type: "string",
                    description: `スキーマタイプ: ${SCHEMA_TYPES.map((t) => t.id).join(", ")}`,
                  },
                  data: {
                    type: "object",
                    description:
                      "スキーマタイプに応じたフィールドデータ（key-valueオブジェクト）",
                  },
                },
                required: ["type", "data"],
              },
            },
            {
              name: "list_schema_types",
              description:
                "対応しているスキーマタイプの一覧を返します。",
              inputSchema: { type: "object", properties: {} },
            },
          ],
        });

      case "tools/call": {
        const toolName = (body.params as { name: string })?.name;
        const args = (body.params as { arguments: Record<string, unknown> })
          ?.arguments;

        if (toolName === "list_schema_types") {
          return jsonRpcResponse(body.id, {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  SCHEMA_TYPES.map((t) => ({
                    id: t.id,
                    name: t.name,
                    nameJa: t.nameJa,
                    description: t.description,
                    requiredFields: t.fields
                      .filter((f) => f.required)
                      .map((f) => f.key),
                  })),
                  null,
                  2
                ),
              },
            ],
          });
        }

        if (toolName === "generate_schema") {
          const type = args?.type as string;
          const data = args?.data as Record<string, string>;

          if (!type || !data) {
            return jsonRpcResponse(body.id, {
              content: [
                {
                  type: "text",
                  text: "Error: type と data は必須です",
                },
              ],
              isError: true,
            });
          }

          const schemaType = getSchemaType(type);
          if (!schemaType) {
            return jsonRpcResponse(body.id, {
              content: [
                {
                  type: "text",
                  text: `Error: 不明なスキーマタイプ: ${type}`,
                },
              ],
              isError: true,
            });
          }

          const jsonLd = generateSchemaJsonLd(schemaType, data);
          return jsonRpcResponse(body.id, {
            content: [{ type: "text", text: jsonLd }],
          });
        }

        return jsonRpcError(body.id, -32601, `Unknown tool: ${toolName}`);
      }

      default:
        return jsonRpcError(body.id, -32601, "Method not found");
    }
  } catch {
    return jsonRpcError(null, -32700, "Parse error");
  }
}
