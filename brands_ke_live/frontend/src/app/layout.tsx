import type { Metadata } from "next";
import { SITE_URL, absoluteUrl } from "@/lib/site-url";
import "./brands-ke.css";

const canonical = absoluteUrl("/");
const title = "Brands KE";
const description = "Discover the best of global style curated for Kenya.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: { canonical },
  icons: {
    icon: [
      { url: "/brands_ke_logo.png", type: "image/png", sizes: "32x32" },
      { url: "/brands_ke_logo.png", type: "image/png", sizes: "16x16" },
    ],
    apple: "/brands_ke_logo.png",
    shortcut: "/brands_ke_logo.png",
  },
  openGraph: {
    type: "website",
    url: canonical,
    title,
    description,
    siteName: "Brands KE",
  },
};

export default function BrandsKeLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
