# SEO & Accessibility Improvements Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement all SEO and accessibility improvements across the personal portfolio site at https://daviddominguez.dev.

**Architecture:** Purely additive markup and metadata changes — no new dependencies, no behaviour changes. Next.js App Router conventions handle robots/sitemap as TypeScript modules. Accessibility fixes add ARIA attributes and a focus trap to existing components.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4

---

### Task 1: Rich metadata in layout.tsx

**Files:**
- Modify: `app/layout.tsx`

**Step 1: Replace the metadata export**

Open `app/layout.tsx`. Replace the existing `metadata` export entirely:

```tsx
export const metadata: Metadata = {
  title: "Luisa Hernandez",
  description:
    "CTO and AI Engineer building privacy-first intelligence tools. TypeScript, React, LLM routing, and agentic systems.",
  metadataBase: new URL("https://daviddominguez.dev"),
  alternates: {
    canonical: "/",
  },
  authors: [{ name: "Luisa Hernandez", url: "https://daviddominguez.dev" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "profile",
    title: "Luisa Hernandez",
    description:
      "CTO and AI Engineer building privacy-first intelligence tools.",
    url: "https://daviddominguez.dev",
    siteName: "Luisa Hernandez",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Luisa Hernandez — CTO / AI Engineer / Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luisa Hernandez",
    description:
      "CTO and AI Engineer building privacy-first intelligence tools.",
    images: ["/opengraph-image"],
  },
};
```

**Step 2: Add JSON-LD structured data**

Inside `RootLayout`, add a `<script>` tag as the first child of `<body>`:

```tsx
<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Luisa Hernandez",
        jobTitle: "CTO / AI Engineer",
        url: "https://daviddominguez.dev",
        sameAs: [
          "https://github.com/daviddominguezh/",
          "https://linkedin.com/in/daviddominguez",
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
```

**Step 3: Verify build passes**

```bash
npm run build
```

Expected: no TypeScript or build errors.

**Step 4: Commit**

```bash
git add app/layout.tsx
git commit -m "feat(seo): add rich metadata, OG tags, Twitter card, and JSON-LD Person schema"
```

---

### Task 2: OG image route

**Files:**
- Create: `app/opengraph-image.tsx`

**Step 1: Create the file**

```tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Luisa Hernandez — CTO / AI Engineer / Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
          Luisa Hernandez
        </h1>
        <p
          style={{
            color: "#888888",
            fontSize: 28,
            margin: "12px 0 0",
            letterSpacing: "-0.01em",
          }}
        >
          CTO / AI Engineer / Builder
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
          I build intelligence that stays where it belongs.
        </p>
      </div>
    ),
    { ...size }
  );
}
```

**Step 2: Verify build passes**

```bash
npm run build
```

Expected: no errors. Next.js auto-generates `/opengraph-image` route.

**Step 3: Commit**

```bash
git add app/opengraph-image.tsx
git commit -m "feat(seo): add auto-generated OG image route (1200x630)"
```

---

### Task 3: robots.ts and sitemap.ts

**Files:**
- Create: `app/robots.ts`
- Create: `app/sitemap.ts`

**Step 1: Create robots.ts**

```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://daviddominguez.dev/sitemap.xml",
  };
}
```

**Step 2: Create sitemap.ts**

```ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://daviddominguez.dev",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
```

**Step 3: Verify build passes**

```bash
npm run build
```

Expected: no errors. Routes `/robots.txt` and `/sitemap.xml` are now served by Next.js.

**Step 4: Commit**

```bash
git add app/robots.ts app/sitemap.ts
git commit -m "feat(seo): add robots.txt and sitemap.xml via Next.js conventions"
```

---

### Task 4: Skip-to-content link in page.tsx

**Files:**
- Modify: `app/page.tsx`

**Step 1: Add skip link**

Add a skip link as the first child inside `<main>`. It is visually hidden until focused (keyboard users only):

```tsx
<main className="min-h-screen bg-[var(--gray-1)] text-[var(--gray-12)]">
  <a
    href="#experience"
    className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-black"
  >
    Skip to main content
  </a>
  <Navbar />
  {/* ... rest unchanged */}
```

**Step 2: Verify visually**

```bash
npm run dev
```

Open the site, press Tab once — the skip link should appear in the top-left corner. Press Enter — page should jump to the Experience section.

**Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat(a11y): add skip-to-content link for keyboard navigation"
```

---

### Task 5: Navbar aria-label

**Files:**
- Modify: `app/components/navigation/navbar.tsx`

**Step 1: Add aria-label to the nav element**

Change the opening `<nav>` tag from:

```tsx
<nav
  className="fixed top-0 right-0 left-0 z-40 flex h-14 items-center justify-between px-6 md:px-8"
```

To:

```tsx
<nav
  aria-label="Main navigation"
  className="fixed top-0 right-0 left-0 z-40 flex h-14 items-center justify-between px-6 md:px-8"
```

**Step 2: Commit**

```bash
git add app/components/navigation/navbar.tsx
git commit -m "feat(a11y): add aria-label to main nav landmark"
```

---

### Task 6: Mobile nav — ARIA and focus trap

**Files:**
- Modify: `app/components/navigation/mobile-nav.tsx`

**Step 1: Add refs and focus trap logic**

Add `useRef` imports and refs for the hamburger button, close button, and drawer. Add focus trap and Escape key handler. The full updated file:

```tsx
"use client";

import { useState, useCallback, useLayoutEffect, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const SECTIONS = [
  { id: "experience", label: "Experience" },
  { id: "philosophy", label: "Philosophy" },
  { id: "work", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "education", label: "Education" },
  { id: "signal", label: "Contact" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  // Focus management: move focus into/out of drawer on open/close
  useEffect(() => {
    if (open) {
      closeButtonRef.current?.focus();
    } else {
      hamburgerRef.current?.focus();
    }
  }, [open]);

  // Focus trap + Escape key
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;

      const drawer = drawerRef.current;
      if (!drawer) return;

      const focusable = drawer.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const navigate = useCallback((id: string) => {
    setOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  }, []);

  const portal = mounted
    ? createPortal(
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 md:hidden"
            style={{
              zIndex: 9998,
              opacity: open ? 1 : 0,
              pointerEvents: open ? "auto" : "none",
              transition: "opacity 0.3s ease",
            }}
            onClick={() => setOpen(false)}
          />

          {/* Drawer */}
          <div
            ref={drawerRef}
            id="mobile-nav-dialog"
            className="fixed top-0 left-0 h-full w-64 bg-black px-6 py-8 md:hidden"
            aria-hidden={!open}
            aria-modal={open}
            aria-labelledby="mobile-nav-title"
            role="dialog"
            style={{
              zIndex: 9999,
              transform: open ? "translateX(0)" : "translateX(-100%)",
              transition: "transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
            }}
          >
            <h2 id="mobile-nav-title" className="sr-only">
              Navigation
            </h2>

            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Close navigation"
              className="mb-10 flex self-end text-[var(--gray-6)] hover:text-[var(--gray-12)]"
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
              {SECTIONS.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => navigate(s.id)}
                  tabIndex={open ? 0 : -1}
                  className="flex items-center gap-4 py-3 text-left"
                >
                  <span className="font-mono text-[11px] tracking-[0.06em] text-[var(--gray-5)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] font-medium text-[var(--gray-10)] transition-colors duration-150 hover:text-[var(--gray-12)]">
                    {s.label}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </>,
        document.body
      )
    : null;

  return (
    <>
      {/* Hamburger button — mobile only */}
      <button
        ref={hamburgerRef}
        type="button"
        aria-label="Open navigation"
        aria-expanded={open}
        aria-controls="mobile-nav-dialog"
        className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
        onClick={() => setOpen(true)}
      >
        <span className="block h-px w-5 bg-[var(--gray-9)]" />
        <span className="block h-px w-5 bg-[var(--gray-9)]" />
        <span className="block h-px w-3 bg-[var(--gray-9)]" />
      </button>

      {portal}
    </>
  );
}
```

**Step 2: Verify manually**

```bash
npm run dev
```

On mobile viewport (or DevTools mobile mode):
- Tab to hamburger → Enter opens drawer → focus moves to close button
- Tab cycles through close + 6 nav buttons and wraps back to close
- Shift+Tab cycles backwards
- Escape closes and returns focus to hamburger

**Step 3: Commit**

```bash
git add app/components/navigation/mobile-nav.tsx
git commit -m "feat(a11y): add focus trap, aria-labelledby, and aria-controls to mobile nav dialog"
```

---

### Task 7: Scroll sidebar — ARIA labels and aria-hidden

**Files:**
- Modify: `app/components/navigation/scroll-sidebar.tsx`

**Step 1: Add aria-hidden to the sidebar wrapper**

Find the outer `<div className="fixed left-6 z-30 ...">` and add `aria-hidden={!visible}`:

```tsx
<div
  aria-hidden={!visible}
  className="fixed left-6 z-30 hidden items-center lg:flex"
  style={{ ... }}
>
```

**Step 2: Add aria-label to section buttons**

Find the section label `<button>` inside the `SECTION_TICK_INDICES.map(...)` block. Add `aria-label`:

```tsx
<button
  key={sectionIdx}
  aria-label={SECTIONS[sectionIdx].label}
  onClick={() => scrollToSection(SECTIONS[sectionIdx].id)}
  className="absolute left-0 cursor-pointer"
  style={{ ... }}
>
```

**Step 3: Add aria-label to the "Let's talk" button**

Find the `<button onClick={() => scrollToSection("signal")}` and add `aria-label`:

```tsx
<button
  onClick={() => scrollToSection("signal")}
  aria-label="Scroll to contact section"
  className="group absolute cursor-pointer"
  style={{ ... }}
>
```

**Step 4: Commit**

```bash
git add app/components/navigation/scroll-sidebar.tsx
git commit -m "feat(a11y): add aria-labels and aria-hidden to scroll sidebar"
```

---

### Task 8: aria-hidden on decorative 3D canvases

**Files:**
- Modify: `app/components/brain/brain-canvas.tsx`
- Modify: `app/components/brain/wave-lines.tsx`
- Modify: `app/components/brain/signal-sphere-canvas.tsx`

**Step 1: brain-canvas.tsx — wrap in aria-hidden div**

```tsx
"use client";

import dynamic from "next/dynamic";

const BrainRenderer = dynamic(() => import("./brain-renderer"), {
  ssr: false,
});

export function BrainCanvas() {
  return (
    <div aria-hidden="true">
      <BrainRenderer />
    </div>
  );
}
```

**Step 2: wave-lines.tsx — add aria-hidden to existing outer div**

Find the outermost `<div className="absolute inset-0 z-0 overflow-hidden">` and add `aria-hidden="true"`:

```tsx
<div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden">
```

**Step 3: signal-sphere-canvas.tsx — wrap in aria-hidden div**

```tsx
"use client";

import dynamic from "next/dynamic";

const SignalSphereRenderer = dynamic(() => import("./signal-sphere-renderer"), {
  ssr: false,
});

export function SignalSphereCanvas() {
  return (
    <div aria-hidden="true">
      <SignalSphereRenderer />
    </div>
  );
}
```

**Step 4: Commit**

```bash
git add app/components/brain/brain-canvas.tsx app/components/brain/wave-lines.tsx app/components/brain/signal-sphere-canvas.tsx
git commit -m "feat(a11y): mark decorative 3D canvases as aria-hidden"
```

---

### Task 9: Fix heading hierarchy in philosophy-section.tsx

**Files:**
- Modify: `app/components/sections/philosophy-section.tsx`

**Context:** The section already has an `<h2>` heading ("My Philosophy"). The principle titles inside it are also `<h2>`, which breaks heading hierarchy. They must be `<h3>`.

**Step 1: Fix desktop render**

Find the principle title in the desktop block (inside `<div className="hidden md:block">`):

```tsx
{/* Before */}
<h2 className="text-[clamp(24px,3.5vw,32px)] font-medium leading-[1.2] tracking-[-0.02em] text-[var(--gray-12)]">
  {PRINCIPLES[active].title}
</h2>

{/* After */}
<h3 className="text-[clamp(24px,3.5vw,32px)] font-medium leading-[1.2] tracking-[-0.02em] text-[var(--gray-12)]">
  {PRINCIPLES[active].title}
</h3>
```

**Step 2: Fix mobile render**

Find the principle title in the mobile block (inside `<div className="space-y-12 md:hidden">`):

```tsx
{/* Before */}
<h2 className="text-[clamp(22px,5vw,28px)] font-medium leading-[1.2] tracking-[-0.02em] text-[var(--gray-12)]">
  {item.title}
</h2>

{/* After */}
<h3 className="text-[clamp(22px,5vw,28px)] font-medium leading-[1.2] tracking-[-0.02em] text-[var(--gray-12)]">
  {item.title}
</h3>
```

**Step 3: Commit**

```bash
git add app/components/sections/philosophy-section.tsx
git commit -m "feat(a11y): fix heading hierarchy in philosophy section (h2 -> h3 for principles)"
```

---

### Task 10: Social link aria-labels in signal-section.tsx

**Files:**
- Modify: `app/components/sections/signal-section.tsx`

**Step 1: Add aria-label to each social link**

Find the `SOCIALS.map(...)` block. Add `aria-label` to each anchor:

```tsx
<a
  key={link.label}
  href={link.href}
  target="_blank"
  rel="noopener noreferrer"
  aria-label={`${link.label}, opens in new tab`}
  className="group relative inline-block overflow-hidden"
>
```

**Step 2: Commit**

```bash
git add app/components/sections/signal-section.tsx
git commit -m "feat(a11y): add aria-labels to external social links"
```

---

### Task 11: Project link aria-label in work-project-card.tsx

**Files:**
- Modify: `app/components/sections/work-project-card.tsx`

**Step 1: Add aria-label to project link**

Find the `<a href={project.link}` element and add `aria-label`:

```tsx
<a
  href={project.link}
  target="_blank"
  rel="noopener noreferrer"
  aria-label={`View ${project.name}, opens in new tab`}
  className="inline-flex items-center gap-1.5 text-[13px] text-blue-400 transition-colors duration-200 hover:text-blue-300"
>
```

**Step 2: Final build check**

```bash
npm run build
```

Expected: clean build, no errors or warnings.

**Step 3: Commit**

```bash
git add app/components/sections/work-project-card.tsx
git commit -m "feat(a11y): add aria-label to external project links in work cards"
```

---

## Summary of Changes

| File | Change |
|------|--------|
| `app/layout.tsx` | Rich metadata, OG, Twitter, JSON-LD |
| `app/opengraph-image.tsx` | New — auto-generated OG card |
| `app/robots.ts` | New — robots.txt |
| `app/sitemap.ts` | New — sitemap.xml |
| `app/page.tsx` | Skip-to-content link |
| `app/components/navigation/navbar.tsx` | `aria-label` on `<nav>` |
| `app/components/navigation/mobile-nav.tsx` | Focus trap, `aria-labelledby`, `aria-controls` |
| `app/components/navigation/scroll-sidebar.tsx` | `aria-label` on buttons, `aria-hidden` on wrapper |
| `app/components/brain/brain-canvas.tsx` | `aria-hidden="true"` wrapper |
| `app/components/brain/wave-lines.tsx` | `aria-hidden="true"` on outer div |
| `app/components/brain/signal-sphere-canvas.tsx` | `aria-hidden="true"` wrapper |
| `app/components/sections/philosophy-section.tsx` | `h2` → `h3` for principle titles |
| `app/components/sections/signal-section.tsx` | `aria-label` on social links |
| `app/components/sections/work-project-card.tsx` | `aria-label` on project links |
