import type { Category } from "@/types/category";
import { apiClient } from "./http-client";

interface PublicCategory {
  id: string;
  slug: string;
  name: string;
  title: string;
  description: string;
  imageUrl: string | null;
  imageAlt: string;
  parentId: string | null;
  productCount: number;
  children: { id: string; slug: string; name: string; productCount: number }[];
}

export async function getCategories(): Promise<Category[]> {
  const response = await apiClient.get<{ items: PublicCategory[] }>("/categories", { tags: ["categories"] });
  return response.items.map((category) => ({
    id: category.id,
    slug: category.slug,
    parentId: category.parentId,
    title: category.title || category.name,
    itemCount: category.productCount,
    image: category.imageUrl,
    imageAlt: category.imageAlt || category.title || category.name,
    subCategories: category.children.map((child) => child.name),
    description: category.description,
  }));
}
