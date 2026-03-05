import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-12">
      <div className="mx-auto max-w-5xl px-4">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <p className="text-lg font-bold text-white">
              Schema <span className="text-emerald-500">AI</span>
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/50">
              AIが構造化データを自動生成。
              <br />
              LLMO/AEO時代のSEO対策を簡単に。
            </p>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold text-white">
              スキーマタイプ
            </p>
            <ul className="space-y-2 text-sm text-white/50">
              <li>
                <Link
                  href="/generate/faq"
                  className="transition-colors duration-200 hover:text-white"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/generate/local-business"
                  className="transition-colors duration-200 hover:text-white"
                >
                  ローカルビジネス
                </Link>
              </li>
              <li>
                <Link
                  href="/generate/product"
                  className="transition-colors duration-200 hover:text-white"
                >
                  商品
                </Link>
              </li>
              <li>
                <Link
                  href="/generate/article"
                  className="transition-colors duration-200 hover:text-white"
                >
                  記事
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold text-white">ガイド</p>
            <ul className="space-y-2 text-sm text-white/50">
              <li>
                <Link
                  href="/guides/llmo"
                  className="transition-colors duration-200 hover:text-white"
                >
                  LLMO対策ガイド
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/aeo"
                  className="transition-colors duration-200 hover:text-white"
                >
                  AEO対策ガイド
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="transition-colors duration-200 hover:text-white"
                >
                  Schema AIについて
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-white/30">
          &copy; 2026 Schema AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
