import type { MetadataRoute } from "next";
import { siteConfig } from "./lib/site";
import { getStorefrontHome } from "@/services/storefront.service";

export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const storefront = await getStorefrontHome();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || storefront.store.siteUrl || siteConfig.url;
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    ...(origin ? { sitemap: `${origin}/sitemap.xml`, host: origin } : {}),
  };
}
