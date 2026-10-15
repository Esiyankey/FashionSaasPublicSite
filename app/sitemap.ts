import type { MetadataRoute } from "next";
import { getBlogPosts, getStorefrontHome } from "@/services/storefront.service";
import { getProducts } from "@/services/product.service";
import { siteConfig } from "./lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["", "/shop", "/about", "/blog"];
  const [storefront, products, posts] = await Promise.all([
    getStorefrontHome(),
    getProducts(),
    getBlogPosts({ page: 1, pageSize: 50 }),
  ]);
  const origin = process.env.NEXT_PUBLIC_SITE_URL || storefront.store.siteUrl || siteConfig.url;
  if (!origin) return [];

  return [
    ...staticRoutes.map((route) => ({
      url: `${origin}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...products.map((product) => ({
      url: `${origin}/products/${product.slug}`,
      lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...posts.items.map((post) => ({
      url: `${origin}/blog/${post.slug}`,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
