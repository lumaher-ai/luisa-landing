import type { NextConfig } from "next";

// Set by the GitHub Pages workflow (e.g. "/luisa-landing"). Empty locally so
// `next dev` still serves from the root.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Emit a fully static site into ./out for GitHub Pages.
  output: "export",
  basePath,
  // GitHub Pages has no image optimization server.
  images: { unoptimized: true },
  // Serve /about as /about/index.html so Pages resolves clean URLs.
  trailingSlash: true,
};

export default nextConfig;
