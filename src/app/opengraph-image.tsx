import { ImageResponse } from "next/og";

export const alt = "Schema AI - AI構造化データジェネレーター";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#000000",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 80,
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#ffffff",
            display: "flex",
            gap: 16,
          }}
        >
          <span>Schema</span>
          <span style={{ color: "#10b981" }}>AI</span>
        </div>
        <div
          style={{
            fontSize: 28,
            color: "rgba(255,255,255,0.7)",
            marginTop: 24,
            textAlign: "center",
          }}
        >
          AI構造化データジェネレーター
        </div>
        <div
          style={{
            fontSize: 20,
            color: "rgba(255,255,255,0.4)",
            marginTop: 16,
          }}
        >
          JSON-LD / Schema.org / LLMO / AEO
        </div>
      </div>
    ),
    { ...size }
  );
}
