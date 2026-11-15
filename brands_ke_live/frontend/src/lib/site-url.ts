import type { Metadata } from "next";

function configuredOrigin(): string | null {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (!configured) return null;
  const withProtocol = /^https?:\/\//.test(configured) ? configured : `https://${configured}`;
  return new URL(withProtocol).origin;
}

function vercelOrigin(): string | null {
  const host = (process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL)?.trim();
  if (!host) return null;
  return `https://${host.replace(/^https?:\/\//, "").replace(/\/$/, "")}`;
}

/** Public site origin. Set NEXT_PUBLIC_SITE_URL in production. */
export function siteUrl(): string {
  return configuredOrigin() ?? vercelOrigin() ?? "http://localhost:3000";
}

export const SITE_URL = siteUrl();

/** Absolute URL for a site path. */
export function absoluteUrl(path: string = "/"): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    const parsed = new URL(path);
    return `${SITE_URL}${parsed.pathname}${parsed.search}`;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return SITE_URL;
  return `${SITE_URL}${normalized}`;
}

/** Canonical and Open Graph URL for this shop. */
export function withCanonical(path: string, metadata: Metadata = {}): Metadata {
  const url = absoluteUrl(path);
  const { openGraph, alternates, ...rest } = metadata;
  const title = rest.title;
  const description = rest.description;
  return {
    metadataBase: new URL(SITE_URL),
    ...rest,
    alternates: {
      ...alternates,
      canonical: url,
    },
    openGraph: {
      type: "website",
      siteName: "Brands KE",
      ...(typeof title === "string" ? { title } : {}),
      ...(typeof description === "string" ? { description } : {}),
      ...openGraph,
      url,
    },
  };
}
