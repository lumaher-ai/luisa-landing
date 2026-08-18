// GitHub Pages serves this site from a subpath (/luisa-landing). Next.js
// rewrites `next/link` and `next/image` URLs automatically, but plain <a href>
// and anything hand-written needs the prefix applied explicitly.
export const basePath: string = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const siteUrl: string =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/** Prefix a root-relative path (e.g. "/cv.pdf") with the deployment basePath. */
export function asset(path: string): string {
  return `${basePath}${path}`;
}
