import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { FeedbackWidget } from "@/components/feedback-widget";
import { GoogleAnalytics } from "@/components/google-analytics";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Schema AI - AI構造化データジェネレーター | JSON-LD自動生成ツール",
    template: "%s | Schema AI",
  },
  description:
    "AIがSchema.org準拠のJSON-LD構造化データを自動生成。FAQ、商品、ローカルビジネスなど10タイプ対応。LLMO/AEO時代のSEO対策を無料で。登録不要、30秒で生成。",
  keywords: [
    "構造化データ",
    "JSON-LD",
    "Schema.org",
    "SEO",
    "LLMO",
    "AEO",
    "リッチスニペット",
    "構造化データ 生成",
    "JSON-LD ジェネレーター",
    "AI SEO",
  ],
  metadataBase: new URL("https://schema.ezoai.jp"),
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "Schema AI",
    title: "Schema AI - AI構造化データジェネレーター | 無料JSON-LD生成",
    description:
      "AIがSchema.org準拠のJSON-LD構造化データを自動生成。FAQ、商品、ローカルビジネスなど10タイプ対応。登録不要、30秒で完了。",
    url: "https://schema.ezoai.jp",
  },
  twitter: {
    card: "summary_large_image",
    title: "Schema AI - AI構造化データジェネレーター",
    description:
      "Schema.org準拠のJSON-LDを自動生成。10スキーマタイプ対応。無料・登録不要。",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://schema.ezoai.jp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
        <FeedbackWidget repoName="web-url" />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
