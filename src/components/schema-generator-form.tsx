"use client";

import { useState, useRef, useCallback, useEffect } from "react";
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

interface HistoryEntry {
  type: string;
  typeNameJa: string;
  code: string;
  createdAt: string;
}

const HISTORY_KEY = "schema-ai-history";
const MAX_HISTORY = 20;

function saveToHistory(entry: HistoryEntry) {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    const history: HistoryEntry[] = raw ? JSON.parse(raw) : [];
    history.unshift(entry);
    if (history.length > MAX_HISTORY) history.length = MAX_HISTORY;
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch {
    // localStorage not available
  }
}

interface SchemaGeneratorFormProps {
  schemaType: SchemaTypeConfig;
}

export function SchemaGeneratorForm({ schemaType }: SchemaGeneratorFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      if (raw) setHistory(JSON.parse(raw));
    } catch {
      // localStorage not available
    }
  }, []);

  function handleChange(key: string, value: string) {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const field = schemaType.fields.find((f) => f.key === key);
      if (field && value.trim()) {
        return prev.filter((e) => e !== field.label);
      }
      return prev;
    });
  }

  function handleGenerate() {
    const missing = schemaType.fields
      .filter((f) => f.required && !formData[f.key]?.trim())
      .map((f) => f.label);

    if (missing.length > 0) {
      setErrors(missing);
      return;
    }
    setErrors([]);
    const code = generateSchemaJsonLd(schemaType, formData);
    setGeneratedCode(code);
    setCopied(false);
    setCopiedSnippet(false);

    const entry: HistoryEntry = {
      type: schemaType.id,
      typeNameJa: schemaType.nameJa,
      code,
      createdAt: new Date().toISOString(),
    };
    saveToHistory(entry);
    setHistory((prev) => {
      const next = [entry, ...prev];
      if (next.length > MAX_HISTORY) next.length = MAX_HISTORY;
      return next;
    });

    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  const handleReset = useCallback(() => {
    setFormData({});
    setGeneratedCode("");
    setErrors([]);
    setCopied(false);
    setCopiedSnippet(false);
  }, []);

  function handleDownload() {
    const blob = new Blob([generatedCode], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${schemaType.id}-schema.jsonld`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleCopySnippet() {
    const snippet = `<script type="application/ld+json">\n${generatedCode}\n</script>`;
    await navigator.clipboard.writeText(snippet);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  }

  const htmlSnippet = generatedCode
    ? `<script type="application/ld+json">\n${generatedCode}\n</script>`
    : "";

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        {schemaType.fields.map((field) => {
          const hasError = errors.includes(field.label);
          return (
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
                  className={`border-white/10 bg-white/5 text-white placeholder:text-white/30 ${hasError ? "border-red-500/50" : ""}`}
                />
              ) : field.type === "select" ? (
                <Select
                  value={formData[field.key] || ""}
                  onValueChange={(v) => handleChange(field.key, v)}
                >
                  <SelectTrigger
                    className={`border-white/10 bg-white/5 text-white ${hasError ? "border-red-500/50" : ""}`}
                  >
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
                  className={`border-white/10 bg-white/5 text-white placeholder:text-white/30 ${hasError ? "border-red-500/50" : ""}`}
                />
              )}
              {hasError && (
                <p className="text-xs text-red-400">このフィールドは必須です</p>
              )}
            </div>
          );
        })}

        {errors.length > 0 && (
          <p className="text-sm text-red-400">
            必須フィールドを入力してください
          </p>
        )}

        <div className="flex gap-3">
          <Button
            onClick={handleGenerate}
            className="h-12 flex-1 bg-emerald-500 text-base font-semibold text-black transition-all duration-200 hover:bg-emerald-400"
          >
            JSON-LDを生成
          </Button>
          {(generatedCode || Object.keys(formData).length > 0) && (
            <Button
              onClick={handleReset}
              variant="outline"
              className="h-12 border-white/10 text-white transition-all duration-200 hover:bg-white/10"
            >
              リセット
            </Button>
          )}
        </div>
      </div>

      {generatedCode && (
        <div ref={resultRef} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">
              生成されたJSON-LD
            </h3>
            <div className="flex gap-2">
              <Button
                onClick={handleDownload}
                variant="outline"
                size="sm"
                className="border-white/10 text-white hover:bg-white/10"
              >
                ダウンロード
              </Button>
              <Button
                onClick={handleCopy}
                variant="outline"
                size="sm"
                className="border-white/10 text-white hover:bg-white/10"
              >
                {copied ? "コピー済み" : "コピー"}
              </Button>
            </div>
          </div>
          <pre className="overflow-x-auto rounded-lg border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-emerald-400">
            <code>{generatedCode}</code>
          </pre>

          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="mb-2 flex items-center justify-between">
              <h4 className="text-sm font-semibold text-white">
                HTMLスニペット（そのまま貼り付け可能）
              </h4>
              <Button
                onClick={handleCopySnippet}
                variant="outline"
                size="sm"
                className="border-white/10 text-white hover:bg-white/10"
              >
                {copiedSnippet ? "コピー済み" : "HTMLをコピー"}
              </Button>
            </div>
            <pre className="overflow-x-auto rounded bg-white/5 p-3 text-sm leading-relaxed text-white/70">
              <code>{htmlSnippet}</code>
            </pre>
            <p className="mt-3 text-xs leading-relaxed text-white/40">
              上記のコードをHTMLの
              <code className="mx-1 rounded bg-white/10 px-1 py-0.5 text-emerald-400">
                &lt;head&gt;
              </code>
              タグ内に貼り付けてください
            </p>
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

      {history.length > 0 && (
        <div className="border-t border-white/10 pt-8">
          <h3 className="mb-4 text-lg font-semibold text-white">
            生成履歴
          </h3>
          <div className="space-y-2">
            {history.slice(0, 5).map((entry, i) => (
              <button
                key={`${entry.createdAt}-${i}`}
                onClick={() => {
                  setGeneratedCode(entry.code);
                  setCopied(false);
                  setCopiedSnippet(false);
                  setTimeout(() => {
                    resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }, 100);
                }}
                className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-left transition-all duration-200 hover:border-emerald-500/30 hover:bg-white/10"
              >
                <div>
                  <p className="text-sm font-medium text-white">
                    {entry.typeNameJa}
                  </p>
                  <p className="text-xs text-white/40">
                    {new Date(entry.createdAt).toLocaleString("ja-JP")}
                  </p>
                </div>
                <span className="text-xs text-emerald-500">表示</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
