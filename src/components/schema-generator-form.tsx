"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SchemaTypeConfig } from "@/lib/schema-types";
import { generateSchemaJsonLd } from "@/lib/generate-schema";

interface SchemaGeneratorFormProps {
  schemaType: SchemaTypeConfig;
}

export function SchemaGeneratorForm({ schemaType }: SchemaGeneratorFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [copied, setCopied] = useState(false);

  function handleChange(key: string, value: string) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  function handleGenerate() {
    const code = generateSchemaJsonLd(schemaType, formData);
    setGeneratedCode(code);
    setCopied(false);
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        {schemaType.fields.map((field) => (
          <div key={field.key} className="space-y-2">
            <Label htmlFor={field.key} className="text-sm text-white/70">
              {field.label}
              {field.required && (
                <span className="ml-1 text-emerald-500">*</span>
              )}
            </Label>
            {field.type === "textarea" ? (
              <Textarea
                id={field.key}
                placeholder={field.placeholder}
                value={formData[field.key] || ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
                rows={6}
                className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
              />
            ) : field.type === "select" ? (
              <Select
                value={formData[field.key] || ""}
                onValueChange={(v) => handleChange(field.key, v)}
              >
                <SelectTrigger className="border-white/10 bg-white/5 text-white">
                  <SelectValue placeholder="選択してください" />
                </SelectTrigger>
                <SelectContent className="border-white/10 bg-black">
                  {field.options?.map((opt) => (
                    <SelectItem
                      key={opt.value}
                      value={opt.value}
                      className="text-white hover:bg-white/10"
                    >
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                id={field.key}
                type={field.type}
                placeholder={field.placeholder}
                value={formData[field.key] || ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
              />
            )}
          </div>
        ))}

        <Button
          onClick={handleGenerate}
          className="h-12 w-full bg-emerald-500 text-base font-semibold text-black transition-all duration-200 hover:bg-emerald-400"
        >
          JSON-LDを生成
        </Button>
      </div>

      {generatedCode && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">
              生成されたJSON-LD
            </h3>
            <Button
              onClick={handleCopy}
              variant="outline"
              size="sm"
              className="border-white/10 text-white hover:bg-white/10"
            >
              {copied ? "コピー済み" : "コピー"}
            </Button>
          </div>
          <pre className="overflow-x-auto rounded-lg border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-emerald-400">
            <code>{generatedCode}</code>
          </pre>

          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <h4 className="mb-2 text-sm font-semibold text-white">
              設置方法
            </h4>
            <p className="text-sm leading-relaxed text-white/50">
              上記のコードを以下のタグで囲んで、HTMLの
              <code className="mx-1 rounded bg-white/10 px-1.5 py-0.5 text-emerald-400">
                &lt;head&gt;
              </code>
              タグ内に設置してください:
            </p>
            <pre className="mt-2 rounded bg-white/5 p-2 text-sm text-white/70">
              {`<script type="application/ld+json">\n  ... (生成されたコード) ...\n</script>`}
            </pre>
          </div>

          <div className="flex gap-4">
            <a
              href="https://search.google.com/test/rich-results"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-emerald-500 transition-colors duration-200 hover:text-emerald-400"
            >
              Google リッチリザルトテストで検証 →
            </a>
            <a
              href="https://validator.schema.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-emerald-500 transition-colors duration-200 hover:text-emerald-400"
            >
              Schema.org バリデーター →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
