import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt: string = "David Dominguez — CTO and AI Engineer who ships LLM systems that generate revenue and unblock growth";
export const size: { width: number; height: number } = { width: 1200, height: 630 };
export const contentType: string = "image/png";

export default function Image(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          padding: "0 80px",
        }}
      >
        <p
          style={{
            color: "#ff4d00",
            fontSize: 15,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          daviddominguez.dev
        </p>
        <h1
          style={{
            color: "#ffffff",
            fontSize: 72,
            fontWeight: 500,
            margin: "16px 0 0",
            letterSpacing: "-0.03em",
          }}
        >
          David Dominguez
        </h1>
        <p
          style={{
            color: "#888888",
            fontSize: 28,
            margin: "12px 0 0",
            letterSpacing: "-0.01em",
          }}
        >
          CTO · LLM Engineer · 0→1 AI Products
        </p>
        <p
          style={{
            color: "#444444",
            fontSize: 20,
            margin: "28px 0 0",
            maxWidth: 700,
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          12x inference cost reduction · 800K+ users scaled · 1M+ platform users
        </p>
      </div>
    ),
    { ...size }
  );
}
