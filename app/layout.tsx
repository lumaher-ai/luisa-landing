import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
});

export const viewport: Viewport = {
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Luisa Hern\u00e1ndez \u2014 Senior AI Engineer",
  description:
    "Senior AI & Backend Engineer who ships production GenAI from 0 to 1. Built autonomous LangGraph agents that handle 10k+ daily WhatsApp conversations and resolve 60% of inquiries at Closer, taking the company to $25K MRR. Expert in Python, Node.js, RAG pipelines, and multi-agent LLM systems on AWS.",
  metadataBase: new URL("https://luisahernandez.dev"),
  alternates: {
    canonical: "/",
  },
  authors: [{ name: "Luisa Hern\u00e1ndez", url: "https://luisahernandez.dev" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "profile",
    title: "Luisa Hern\u00e1ndez \u2014 Senior AI Engineer",
    description:
      "Senior AI Engineer shipping production GenAI from 0 to 1. Autonomous LangGraph agents handling 10k+ daily conversations, 60% resolved without a human, $25K MRR from zero. Python \u00b7 Node.js \u00b7 RAG \u00b7 multi-agent LLM systems on AWS.",
    url: "https://luisahernandez.dev",
    siteName: "Luisa Hern\u00e1ndez",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Luisa Hern\u00e1ndez \u2014 Senior AI Engineer shipping production GenAI agents that handle 10k+ conversations a day",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luisa Hern\u00e1ndez \u2014 Senior AI Engineer",
    description:
      "Senior AI Engineer shipping production GenAI from 0 to 1. Autonomous LangGraph agents handling 10k+ daily conversations, 60% resolved without a human, $25K MRR from zero. Python \u00b7 Node.js \u00b7 RAG \u00b7 multi-agent LLM systems on AWS.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Luisa Hernández",
              jobTitle: "Senior AI & Backend Engineer",
              url: "https://luisahernandez.dev",
              email: "mailto:lmhm0928@gmail.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bogotá",
                addressCountry: "CO",
              },
              sameAs: [
                "https://www.linkedin.com/in/lmhm0928",
              ],
              knowsAbout: [
                "Generative AI",
                "LLM Integration",
                "AI Agents",
                "LangGraph",
                "LangChain",
                "RAG Pipelines",
                "Prompt Engineering",
                "Model Context Protocol",
                "Python",
                "Node.js",
                "TypeScript",
                "AWS",
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
