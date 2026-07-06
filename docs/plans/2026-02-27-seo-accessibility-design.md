# SEO & Accessibility Improvements — Design Doc

**Date:** 2026-02-27
**Site:** https://daviddominguez.dev
**Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4

---

## Goal

Implement all possible SEO and accessibility improvements on the personal portfolio site, targeting WCAG 2.1 AA compliance and maximum search engine discoverability.

---

## Section 1 — SEO Metadata & Discoverability

### `app/layout.tsx`
Replace sparse `metadata` export with a full Next.js `Metadata` object:
- `alternates.canonical` → `https://daviddominguez.dev`
- `openGraph` → type `"profile"`, title, description, url, siteName, locale `en_US`, image pointing to OG image route
- `twitter` → `"summary_large_image"` card, title, description, image
- `authors` → `[{ name: "Luisa Hernandez", url: "https://daviddominguez.dev" }]`
- `robots` → `{ index: true, follow: true }`
- Inject JSON-LD `<script type="application/ld+json">` with `Person` schema:
  - name, jobTitle (`"CTO / AI Engineer"`), url, sameAs (GitHub + LinkedIn), knowsAbout list

### `app/opengraph-image.tsx`
- Next.js `ImageResponse` route (1200×630, generated at build time)
- Dark card matching site aesthetic: name, title, tagline
- No external runtime dependencies

### `app/robots.ts`
- Next.js `MetadataRoute.Robots` export
- Allow all crawlers, point sitemap to `https://daviddominguez.dev/sitemap.xml`

### `app/sitemap.ts`
- Next.js `MetadataRoute.Sitemap` export
- Single entry: `https://daviddominguez.dev`, `changeFrequency: "monthly"`, `priority: 1`

---

## Section 2 — Accessibility: Navigation & Interactive Components

### `app/page.tsx`
- Add visually-hidden skip link as first child of `<main>`, targeting `#experience`
- Visible on keyboard focus only (standard WCAG 2.4.1 bypass pattern)

### `app/components/navigation/navbar.tsx`
- Add `aria-label="Main navigation"` to `<nav>` element

### `app/components/navigation/mobile-nav.tsx`
- Add `id="mobile-nav-dialog"` to drawer div
- Add visually-hidden `<h2 id="mobile-nav-title">Navigation</h2>` inside drawer
- Set `aria-labelledby="mobile-nav-title"` on the dialog element
- Add focus trap: on open → focus close button; Tab/Shift+Tab cycle within drawer; on close → return focus to hamburger button
- Add `aria-controls="mobile-nav-dialog"` to hamburger button

### `app/components/navigation/scroll-sidebar.tsx`
- Each section `<button>` gets `aria-label={section.label}`
- "Let's talk" `<button>` gets `aria-label="Scroll to contact section"`
- Sidebar wrapper gets `aria-hidden="true"` when `visible === false` (currently off-screen but still keyboard-reachable)

---

## Section 3 — Accessibility: Content & Decorative Elements

### `app/components/brain/brain-canvas.tsx`
- Add `aria-hidden="true"` to outermost container (decorative 3D canvas)

### `app/components/brain/wave-lines.tsx`
- Add `aria-hidden="true"` to outermost container (decorative)

### `app/components/brain/signal-sphere-canvas.tsx`
- Add `aria-hidden="true"` to outermost container (decorative)

### `app/components/sections/philosophy-section.tsx`
- Change principle title elements from `<h2>` to `<h3>` in both desktop and mobile renders
- Maintains correct heading hierarchy: `h1` (hero) → `h2` (sections) → `h3` (subsections)

### `app/components/sections/signal-section.tsx`
- Add `aria-label={\`\${link.label}, opens in new tab\`}` to each external social link

### `app/components/sections/work-project-card.tsx`
- Add `aria-label={\`View \${project.name}\`}` to each external project link

---

## Files to Create/Modify

| File | Action |
|------|--------|
| `app/layout.tsx` | Modify — rich metadata + JSON-LD |
| `app/opengraph-image.tsx` | Create — OG image route |
| `app/robots.ts` | Create — robots.txt |
| `app/sitemap.ts` | Create — sitemap.xml |
| `app/page.tsx` | Modify — skip link |
| `app/components/navigation/navbar.tsx` | Modify — nav aria-label |
| `app/components/navigation/mobile-nav.tsx` | Modify — focus trap + ARIA |
| `app/components/navigation/scroll-sidebar.tsx` | Modify — button aria-labels + aria-hidden |
| `app/components/brain/brain-canvas.tsx` | Modify — aria-hidden |
| `app/components/brain/wave-lines.tsx` | Modify — aria-hidden |
| `app/components/brain/signal-sphere-canvas.tsx` | Modify — aria-hidden |
| `app/components/sections/philosophy-section.tsx` | Modify — h2 → h3 |
| `app/components/sections/signal-section.tsx` | Modify — social link aria-labels |
| `app/components/sections/work-project-card.tsx` | Modify — project link aria-label |
