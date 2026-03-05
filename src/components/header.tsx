import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-white/10">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-bold text-white">
          Schema <span className="text-emerald-500">AI</span>
        </Link>
        <nav className="flex items-center gap-2 overflow-x-auto text-sm text-white/70 sm:gap-5">
          <Link
            href="/types"
            className="shrink-0 transition-colors duration-200 hover:text-white"
          >
            スキーマ一覧
          </Link>
          <Link
            href="/recommend"
            className="shrink-0 transition-colors duration-200 hover:text-white"
          >
            タイプ診断
          </Link>
          <Link
            href="/guides/llmo"
            className="hidden shrink-0 transition-colors duration-200 hover:text-white sm:block"
          >
            LLMO対策
          </Link>
          <Link
            href="/guides/aeo"
            className="hidden shrink-0 transition-colors duration-200 hover:text-white sm:block"
          >
            AEO対策
          </Link>
          <Link
            href="/about"
            className="shrink-0 transition-colors duration-200 hover:text-white"
          >
            概要
          </Link>
        </nav>
      </div>
    </header>
  );
}
