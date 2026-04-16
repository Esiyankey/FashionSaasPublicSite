import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section
      className="relative min-h-screen overflow-hidden bg-cover bg-right"
      style={{ backgroundImage: "url(/images/hero-image-1.jpg)" }}
    >
      <div className="absolute inset-0 bg-linear-to-r from-gray-50 via-gray-50/95 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="pt-10 lg:pt-0">
            <div className="mb-6 flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-700">
                <div className="h-3 w-3 rounded-full bg-amber-400" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                50% off summer super sale
              </span>
            </div>

            <h1 className="mb-6 text-5xl font-bold leading-tight text-gray-900 lg:text-6xl">
              Step Into Style With A Faster, Cleaner Fashion Storefront
            </h1>

            <p className="mb-8 max-w-md text-lg leading-relaxed text-gray-600">
              Discover curated wardrobe staples, modern editorial styling, and a premium
              shopping experience built for speed and clarity.
            </p>

            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-amber-900 px-8 py-3 font-semibold text-white transition-colors hover:bg-amber-950"
            >
              Shop Now
              <ArrowRight className="size-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
