import Link from "next/link";
import { ShopCatalog } from "@/app/components/shop/ShopCatalog";
import { createMetadata } from "../lib/site";

export const metadata = createMetadata({
  title: "Shop Fashion Collections",
  description:
    "Browse curated dresses, menswear, and accessories with server-rendered product discovery and cleaner client-side filtering.",
  path: "/shop",
  keywords: ["shop fashion", "women clothing", "menswear", "fashion accessories"],
});

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">All Products</h1>
          <nav
            aria-label="Breadcrumb"
            className="flex justify-center gap-4 text-xs uppercase tracking-widest text-gray-500"
          >
            <Link href="/">Home</Link>
            <span>/</span>
            <span aria-current="page">Shop</span>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-[85rem] px-4 py-12">
        <ShopCatalog />
      </section>
    </div>
  );
}
