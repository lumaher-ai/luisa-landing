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
    "CTO and AI Engineer who has scaled products to 1M+ users at near-zero cost and cut AI inference spend by 12x. Rare combination of production LLM architecture, agentic systems, and founding-team judgment — the technical hire that unblocks growth and protects margins.",
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
      "I turn ambiguous AI bets into revenue-generating products. If your AI initiative is months behind and millions at stake, I\u2019m the call you make.",
    url: "https://daviddominguez.dev",
    siteName: "David Dominguez",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "David Dominguez — CTO and AI Engineer who ships LLM systems that generate revenue and unblock growth",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "David Dominguez",
    description:
      "I turn ambiguous AI bets into revenue-generating products. If your AI initiative is months behind and millions at stake, I\u2019m the call you make.",
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
              jobTitle: "Chief Technology Officer & AI Systems Architect",
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
