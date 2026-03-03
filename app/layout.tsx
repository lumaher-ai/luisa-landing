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
    "CTO and AI Engineer who ships privacy-first AI products from zero to production. Specializing in LLM systems, agentic workflows, and full-stack TypeScript — built for founders, VCs, and engineering leaders who need it done right.",
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
      "CTO-for-hire and AI Engineer. I turn ambiguous AI bets into shipped products — privacy-first, production-ready, and built to scale.",
    url: "https://daviddominguez.dev",
    siteName: "David Dominguez",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "David Dominguez — CTO, AI Engineer, and Founder-Ready Technical Leader",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "David Dominguez",
    description:
      "CTO-for-hire and AI Engineer. I turn ambiguous AI bets into shipped products — privacy-first, production-ready, and built to scale.",
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
              jobTitle: "Chief Technology Officer & AI Engineer",
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
