export interface Category {
  id: string;
  slug: string;
  parentId: string | null;
  title: string;
  itemCount: string | number;
  image: string | null;
  imageAlt: string;
  subCategories: string[];
  description?: string;
}
