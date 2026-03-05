"use client";

import Link from "next/link";
import { Header } from "@/components/header";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <p className="text-4xl font-bold text-red-400">Error</p>
          <h1 className="mt-4 text-xl font-bold text-white">
            エラーが発生しました
          </h1>
          <p className="mt-2 text-sm text-white/50">
            ページの読み込み中にエラーが発生しました。
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={reset}
              className="inline-flex h-10 items-center rounded-lg border border-white/10 px-6 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10"
            >
              再試行
            </button>
            <Link
              href="/"
              className="inline-flex h-10 items-center rounded-lg bg-emerald-500 px-6 text-sm font-semibold text-black transition-all duration-200 hover:bg-emerald-400"
            >
              トップに戻る
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
