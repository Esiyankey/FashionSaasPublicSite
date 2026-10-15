import type { Metadata } from "next";

export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL || (process.env.NODE_ENV === "development" ? "http://localhost:3001" : ""),
  locale: "en_US",
  name: "Fashion SaaS",
  shortName: "Fashion",
  description: "A modern fashion storefront focused on curated collections, editorial storytelling, and fast, accessible shopping experiences.",
  contact: {
    phone: "(406) 555-0120",
    email: "hello@fashionsaas.example",
    address: ["2331 Beverly Rd", "Brooklyn, New York 11226", "United States"],
  },
  navLinks: [
    { label: "Home", href: "/" }, { label: "Shop", href: "/shop" }, { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" }, { label: "Contact", href: "/contact" }, { label: "Outfit Finder", href: "/outfit_finder" },
  ],
  footerLinks: [
    { label: "Brand Directory", href: "/shop" }, { label: "Case Studies", href: "/about" },
    { label: "Blog", href: "/blog" }, { label: "Pricing", href: "/about" }, { label: "FAQ", href: "/about" },
    { label: "Contact", href: "mailto:hello@fashionsaas.example" },
  ],
} as const;

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
};

export function createMetadata({
  title,
  description,
  path = "/",
  keywords = [],
}: MetadataInput): Metadata {
  const url = siteConfig.url ? new URL(path, siteConfig.url).toString() : undefined;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      ...(url ? { url } : {}),
      locale: siteConfig.locale,
      type: "website",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}
