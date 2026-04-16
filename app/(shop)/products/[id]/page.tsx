import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/app/components/product/ProductGallery";
import { ProductPurchasePanel } from "@/app/components/product/ProductPurchasePanel";
import { createMetadata } from "@/app/lib/site";
import { findProductById, getRelatedProducts, products } from "@/app/lib/products-data";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return products.map((product) => ({ id: product.id.toString() }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = findProductById(Number(id));

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
  const product = findProductById(Number(id));

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <nav className="mb-3 text-xs uppercase tracking-[0.3em] text-foreground/60">
            <Link href="/">Home</Link> / <Link href="/shop">Shop</Link> /{" "}
            <span aria-current="page">{product.name}</span>
          </nav>
          <p className="text-sm uppercase tracking-widest text-amber-900">{product.category}</p>
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
            <Link href="/shop" className="text-sm uppercase tracking-widest text-amber-900">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((item) => (
              <Link key={item.id} href={`/products/${item.id}`} className="group block">
                <div className="relative mb-4 aspect-square overflow-hidden rounded-lg border border-border bg-secondary transition-colors group-hover:border-accent">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="mb-2 text-sm font-medium transition-colors group-hover:text-accent">
                  {item.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">${item.price}</span>
                  <div className="flex items-center gap-1">
                    <Star className="size-3.5 fill-accent text-accent" />
                    <span className="text-xs text-foreground/60">{item.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
