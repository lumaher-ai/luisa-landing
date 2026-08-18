import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt: string = "Luisa Hern\u00e1ndez \u2014 Senior AI Engineer shipping production GenAI agents that handle 10k+ conversations a day";
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
            color: "#82e6aa",
            fontSize: 15,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          luisahernandez.dev
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
          Luisa Hernández
        </h1>
        <p
          style={{
            color: "#888888",
            fontSize: 28,
            margin: "12px 0 0",
            letterSpacing: "-0.01em",
          }}
        >
          Senior AI Engineer · Production GenAI · 0→1
        </p>
        <p
          style={{
            color: "#444444",
            fontSize: 20,
            margin: "28px 0 0",
            maxWidth: 760,
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          10k+ daily AI conversations · 70% resolved autonomously · $25K MRR from zero
        </p>
      </div>
    ),
    { ...size }
  );
}
