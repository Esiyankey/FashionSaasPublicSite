import type { PaginatedResult } from "@/types/common";
import type { Product, ProductFilters } from "@/types/product";
import { apiClient } from "./http-client";

export interface PublicProduct extends Omit<Product, "category" | "categorySlug" | "originalPrice" | "compareAtPrice" | "image"> {
  category: { slug: string; name: string } | null;
  categories: { slug: string; name: string }[];
  compareAtPrice: number | null;
  image: string;
}

export function mapProduct(product: PublicProduct): Product {
  return {
    ...product,
    category: product.category?.name ?? "Uncategorized",
    categorySlug: product.category?.slug ?? "",
    originalPrice: product.compareAtPrice,
    compareAtPrice: product.compareAtPrice,
    image: product.image ?? "",
    gallery: product.gallery?.filter(Boolean) ?? [],
  };
}

export async function getProducts(filters: ProductFilters = {}): Promise<Product[]> {
  const [minPrice, maxPrice] = filters.priceRange ?? [0, Number.MAX_SAFE_INTEGER];
  const response = await apiClient.get<PaginatedResult<PublicProduct>>("/products", {
    params: {
      category: filters.categories?.length ? filters.categories.join(",") : undefined,
      minPrice: minPrice > 0 ? minPrice : undefined,
      maxPrice: maxPrice < Number.MAX_SAFE_INTEGER ? maxPrice : undefined,
      sort: filters.sortBy ?? "featured",
      page: 1,
      pageSize: 100,
    },
    tags: ["products"],
  });
  return response.items.map(mapProduct);
}

export async function getProductById(slugOrId: string): Promise<Product | undefined> {
  try {
    const product = await apiClient.get<PublicProduct>(`/products/${encodeURIComponent(slugOrId)}`, {
      tags: ["products", `product:${slugOrId}`],
    });
    return mapProduct(product);
  } catch (error) {
    if (error instanceof Error && "status" in error && error.status === 404) return undefined;
    throw error;
  }
}

export async function getRelatedProducts(product: Product): Promise<Product[]> {
  const response = await apiClient.get<{ items: PublicProduct[] }>(
    `/products/${encodeURIComponent(product.slug)}/related`,
    { params: { limit: 4 }, tags: ["products", `product:${product.slug}`] },
  );
  return response.items.map(mapProduct);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const response = await apiClient.get<PaginatedResult<PublicProduct>>("/products", {
    params: { featured: true, page: 1, pageSize: 8 },
    tags: ["products"],
  });
  return response.items.map(mapProduct);
}

export async function getProductFilters() {
  return apiClient.get<{
    priceRange: { min: number; max: number };
    sizes: string[];
    colors: string[];
    productTypes: string[];
  }>("/product-filters", { tags: ["products"] });
}
