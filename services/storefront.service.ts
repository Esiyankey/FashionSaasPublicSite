import { apiClient } from "./http-client";

export interface StorefrontHome {
  store: {
    id: string;
    slug: string;
    name: string;
    description: string | null;
    logoUrl: string | null;
    faviconUrl: string | null;
    primaryColor: string | null;
    secondaryColor: string | null;
    fontFamily: string | null;
    siteUrl: string | null;
    footerText: string | null;
    seo: { title: string; description: string };
  };
  contact: {
    email: string | null;
    phone: string | null;
    addressLines: string[];
    workingHours: string | null;
    mapEmbedUrl: string | null;
  };
  socialLinks: { platform: string; url: string }[];
  announcement: {
    message: string;
    highlight: string | null;
    linkLabel: string | null;
    linkHref: string | null;
    showPhone: boolean;
  } | null;
  hero: {
    badgeText: string | null;
    headline: string;
    subheadline: string | null;
    imageUrl: string | null;
    imageAlt: string;
    ctaLabel: string | null;
    ctaHref: string | null;
  } | null;
  navigation: {
    header: { label: string; href: string }[];
    footer: { label: string; href: string }[];
  };
  commerce: {
    currency: string;
    taxRatePercent: number;
    shippingFlatRate: number;
    freeShippingThreshold: number | null;
  };
  updatedAt: string;
}

export function getStorefrontHome() {
  return apiClient.get<StorefrontHome>("/", { tags: ["content", "settings"] });
}

export function getStorefrontPage<T = Record<string, unknown>, M = { id: string; name: string; role: string; imageUrl: string | null }>(key: string) {
  return apiClient.get<{ key: string; content: T; teamMembers: M[]; updatedAt: string }>(
    `/pages/${encodeURIComponent(key)}`,
    { tags: ["content"] },
  );
}

export function getBlogPosts(params: Record<string, string | number | boolean | undefined> = {}) {
  return apiClient.get<{ items: BlogPostSummary[]; total: number; page: number; pageSize: number; totalPages: number }>(
    "/blog",
    { params, tags: ["blog"] },
  );
}

export interface BlogPostSummary {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImageUrl: string | null;
  coverImageAlt: string;
  authorName: string | null;
  category: { id: string; slug: string; name: string } | null;
  isFeatured: boolean;
  publishedAt: string | null;
  seo: { title: string; description: string };
}

export function getBlogPost(slug: string) {
  return apiClient.get<BlogPostSummary & { content: string }>(`/blog/${encodeURIComponent(slug)}`, {
    tags: ["blog", `blog:${slug}`],
  });
}

export function getBlogCategories() {
  return apiClient.get<{ items: { id: string; slug: string; name: string; postCount: number }[] }>(
    "/blog-categories",
    { tags: ["blog"] },
  );
}

export function submitContact(input: { name: string; email: string; subject: string; message: string; website?: string }) {
  return apiClient.post<{ id: string; message: string }>("/contact", { body: input });
}

export function subscribeNewsletter(email: string, source = "storefront") {
  return apiClient.post<{ status: string; message: string }>("/newsletter", { body: { email, source } });
}

export function getOutfitFinderOptions() {
  return apiClient.get<{
    bodyTypes: { key: string; label: string; imageUrl: string | null }[];
    skinTones: { key: string; label: string; hex: string }[];
    occasions: { key: string; label: string; imageUrl: string | null }[];
  }>("/outfit-finder", { tags: ["outfit-finder"] });
}
