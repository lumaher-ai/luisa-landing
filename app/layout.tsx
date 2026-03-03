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
  title: "David Dominguez",
  description:
    "CTO and LLM engineer who reduced per-conversation AI costs from $0.25 to $0.02 at Closer AI and scaled MercadoLibre\u2019s Affiliates program to 800K+ users, contributing 1% of global company revenue. I architect production AI systems \u2014 routing, agents, cost optimization \u2014 and ship from founding stage through growth.",
  metadataBase: new URL("https://daviddominguez.dev"),
  alternates: {
    canonical: "/",
  },
  authors: [{ name: "David Dominguez", url: "https://daviddominguez.dev" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "profile",
    title: "David Dominguez",
    description:
      "CTO and LLM engineer. Built MercadoLibre\u2019s Affiliates program (800K+ users, 1% of global revenue) and cut AI inference costs 12x at Closer AI. I ship production AI systems from founding stage through growth.",
    url: "https://daviddominguez.dev",
    siteName: "David Dominguez",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "David Dominguez \u2014 CTO and LLM engineer who cut inference costs 12x and scaled a product to 800K+ users at MercadoLibre",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "David Dominguez",
    description:
      "CTO and LLM engineer. Built MercadoLibre\u2019s Affiliates program (800K+ users, 1% of global revenue) and cut AI inference costs 12x at Closer AI. I ship production AI systems from founding stage through growth.",
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
              name: "David Dominguez",
              jobTitle: "Chief Technology Officer",
              url: "https://daviddominguez.dev",
              sameAs: [
                "https://github.com/daviddominguezh/",
                "https://www.linkedin.com/in/daviddominguez",
              ],
              knowsAbout: [
                "TypeScript",
                "React",
                "Node.js",
                "AI Agents",
                "LLM Routing",
                "Python",
                "Docker",
                "Kubernetes",
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
