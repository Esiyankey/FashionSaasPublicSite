import { ShopCatalog } from "@/app/components/shop/ShopCatalog";
import { PageHeader } from "@/components/shared/PageHeader";
import { createMetadata } from "../lib/site";

export const metadata = createMetadata({
  title: "Shop Fashion Collections",
  description:
    "Browse curated dresses, menswear, and accessories with server-rendered product discovery and cleaner client-side filtering.",
  path: "/shop",
  keywords: ["shop fashion", "women clothing", "menswear", "fashion accessories"],
});

export default async function ProductPage({ searchParams }: { searchParams: Promise<{ category?: string | string[] }> }) {
  const params = await searchParams;
  const category = Array.isArray(params.category) ? params.category[0] : params.category;
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title="Our Products" image="/images/hero-image-3.jpg" breadcrumbLabel="Products" />

      <section className="mx-auto max-w-[85rem] px-4 py-12">
        <ShopCatalog initialCategory={category} />
      </section>
    </div>
  );
}
