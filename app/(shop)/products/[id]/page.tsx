import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/app/components/product/ProductGallery";
import { ProductPurchasePanel } from "@/app/components/product/ProductPurchasePanel";
import { ProductCard } from "@/components/shared/ProductCard";
import { createMetadata } from "@/app/lib/site";
import { getProductById, getRelatedProducts } from "@/services/product.service";

type Props = {
  params: Promise<{ id: string }>;
};

export const dynamicParams = true;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return createMetadata({
      title: "Product Not Found",
      description: "The requested product could not be found.",
      path: `/products/${id}`,
    });
  }

  return createMetadata({
    title: product.name,
    description: product.summary,
    path: `/products/${id}`,
    keywords: [product.category, product.productType, product.name],
  });
}

export default async function ProductDetailsPage({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <nav className="mb-3 text-xs uppercase tracking-[0.3em] text-foreground/60">
            <Link href="/">Home</Link> / <Link href="/shop">Shop</Link> /{" "}
            <span aria-current="page">{product.name}</span>
          </nav>
          <p className="text-sm uppercase tracking-widest text-primary">{product.category}</p>
          <h1 className="mt-2 text-3xl font-light uppercase tracking-wide">Product Details</h1>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <ProductGallery name={product.name} images={product.gallery} />
          <ProductPurchasePanel product={product} />
        </div>

        <div className="border-t border-border pt-12">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-light uppercase tracking-wide">Related Products</h2>
            <Link href="/shop" className="text-sm uppercase tracking-widest text-primary">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} variant="compact" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
