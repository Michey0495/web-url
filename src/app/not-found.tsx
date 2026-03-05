import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <p className="text-6xl font-bold text-emerald-500">404</p>
          <h1 className="mt-4 text-2xl font-bold text-white">
            ページが見つかりません
          </h1>
          <p className="mt-2 text-white/50">
            お探しのページは存在しないか、移動した可能性があります。
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex h-12 items-center rounded-lg bg-emerald-500 px-8 text-base font-semibold text-black transition-all duration-200 hover:bg-emerald-400"
          >
            トップに戻る
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
