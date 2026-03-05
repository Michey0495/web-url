import { Header } from "@/components/header";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <div className="mb-6 h-4 w-32 animate-pulse rounded bg-white/10" />
          <div className="h-8 w-64 animate-pulse rounded bg-white/10" />
          <div className="mt-3 h-5 w-full max-w-md animate-pulse rounded bg-white/10" />
          <div className="mt-8 space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-24 animate-pulse rounded bg-white/10" />
                <div className="h-10 w-full animate-pulse rounded bg-white/10" />
              </div>
            ))}
            <div className="h-12 w-full animate-pulse rounded bg-emerald-500/20" />
          </div>
        </div>
      </main>
    </div>
  );
}
