"use client";

import { useState } from "react";

export function FeedbackWidget({ repoName }: { repoName: string }) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"bug" | "feature" | "other">("bug");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const submit = async () => {
    if (!message.trim()) return;
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, message, repo: repoName }),
      });
      setSent(true);
      setTimeout(() => {
        setOpen(false);
        setSent(false);
        setMessage("");
      }, 2000);
    } catch {
      alert("送信に失敗しました");
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-50 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 shadow-lg transition-all duration-200 hover:bg-white/10 hover:text-white"
      >
        フィードバック
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 rounded-xl border border-white/10 bg-black p-4 shadow-2xl">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-bold text-white">フィードバック</h3>
        <button
          onClick={() => setOpen(false)}
          className="text-white/40 transition-colors duration-200 hover:text-white"
        >
          &times;
        </button>
      </div>
      {sent ? (
        <p className="py-4 text-center text-sm text-emerald-500">
          送信しました
        </p>
      ) : (
        <>
          <div className="mb-3 flex gap-2">
            {(["bug", "feature", "other"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`rounded-full px-3 py-1 text-xs transition-all duration-200 ${
                  type === t
                    ? "bg-emerald-500 text-black"
                    : "border border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                {t === "bug" ? "不具合" : t === "feature" ? "要望" : "その他"}
              </button>
            ))}
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="ご意見をお聞かせください..."
            className="mb-3 h-24 w-full resize-none rounded-lg border border-white/10 bg-white/5 p-2 text-sm text-white placeholder:text-white/30"
          />
          <button
            onClick={submit}
            className="w-full rounded-lg bg-emerald-500 py-2 text-sm font-semibold text-black transition-all duration-200 hover:bg-emerald-400"
          >
            送信
          </button>
        </>
      )}
    </div>
  );
}
