export type ProductCategory = string;
export type ProductType = string;
export type ProductSortOption = "featured" | "newest" | "price-asc" | "price-desc" | "name-asc";

export interface ProductVariant {
  id: string;
  title: string;
  size: string | null;
  color: string | null;
  price: number;
  compareAtPrice: number | null;
  available: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  categorySlug: string;
  productType: ProductType;
  price: number;
  originalPrice: number | null;
  compareAtPrice: number | null;
  discount: number;
  rating: number | null;
  image: string;
  summary: string;
  description: string;
  features: string[];
  gallery: string[];
  availableSizes: string[];
  availableColors: string[];
  variants: ProductVariant[];
  isFeatured: boolean;
  currency: string;
  inStock: boolean;
  updatedAt?: string;
}

export interface ProductFilters {
  categories?: ProductCategory[];
  priceRange?: [number, number];
  sortBy?: ProductSortOption;
}
