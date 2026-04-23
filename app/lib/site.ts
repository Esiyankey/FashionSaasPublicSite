import type { Metadata } from "next";

export const siteConfig = {
  name: "Fashion SaaS",
  shortName: "Fashion",
  description:
    "A modern fashion storefront focused on curated collections, editorial storytelling, and fast, accessible shopping experiences.",
  url: "https://fashionsaas.example",
  locale: "en_US",
  contact: {
    phone: "(406) 555-0120",
    email: "hello@fashionsaas.example",
    address: ["2331 Beverly Rd", "Brooklyn, New York 11226", "United States"],
  },
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
  ],
  footerLinks: [
    { label: "Brand Directory", href: "/shop" },
    { label: "Case Studies", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Pricing", href: "/about" },
    { label: "FAQ", href: "/about" },
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
  const url = new URL(path, siteConfig.url).toString();

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${title} | ${siteConfig.name}`,
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
