import type { ProductFilters } from "@/types/product";

export const productKeys = {
  all: ["products"] as const,
  list: (filters: ProductFilters) => [...productKeys.all, "list", filters] as const,
  detail: (id: string) => [...productKeys.all, "detail", id] as const,
  related: (id: string) => [...productKeys.all, "related", id] as const,
  featured: () => [...productKeys.all, "featured"] as const,
};

export const categoryKeys = {
  all: ["categories"] as const,
};
