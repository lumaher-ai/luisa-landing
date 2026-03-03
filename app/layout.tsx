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
    "CTO and LLM engineer who cut AI inference costs 12x at Closer AI and scaled a product to 800K+ users at MercadoLibre. I architect production AI systems \u2014 routing, agents, cost optimization \u2014 and ship them from founding stage through growth.",
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
      "CTO and LLM engineer. I\u2019ve shipped production AI systems from zero and led a 10-person team to 800K users at MercadoLibre. Currently building AI sales infrastructure at Closer AI.",
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
      "CTO and LLM engineer. I\u2019ve shipped production AI systems from zero and led a 10-person team to 800K users at MercadoLibre. Currently building AI sales infrastructure at Closer AI.",
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
