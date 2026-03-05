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
    default: "Schema AI - AI構造化データジェネレーター",
    template: "%s | Schema AI",
  },
  description:
    "AIが自動でSchema.org準拠のJSON-LD構造化データを生成。LLMO/AEO時代のSEO対策を簡単に。",
  metadataBase: new URL("https://schema.ezoai.jp"),
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "Schema AI",
    title: "Schema AI - AI構造化データジェネレーター",
    description:
      "AIが自動でSchema.org準拠のJSON-LD構造化データを生成。LLMO/AEO時代のSEO対策を簡単に。",
  },
  twitter: {
    card: "summary_large_image",
    title: "Schema AI - AI構造化データジェネレーター",
    description:
      "AIが自動でSchema.org準拠のJSON-LD構造化データを生成。LLMO/AEO時代のSEO対策を簡単に。",
  },
  robots: {
    index: true,
    follow: true,
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
