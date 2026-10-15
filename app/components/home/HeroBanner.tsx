import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-7rem)] overflow-hidden bg-stone-100">
      <Image
        src="/images/hero-image-1.jpg"
        alt="Fashion hero campaign"
        fill
        priority
        sizes="100vw"
        className="object-cover object-right"
      />
      <div className="absolute inset-0 bg-linear-to-r from-[#f7f3ec] via-[#f7f3ec]/95 to-[#f7f3ec]/25" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-7rem)] max-w-7xl items-center px-6 py-16 sm:px-8 lg:px-10">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="max-w-2xl py-8">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-amber-200/80 bg-white/75 px-4 py-2 backdrop-blur-sm">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-700">
                <div className="h-2.5 w-2.5 rounded-full bg-amber-300" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                50% off summer super sale
              </span>
            </div>

            <h1 className="mb-6 text-4xl font-bold leading-[1.05] text-gray-900 sm:text-5xl lg:text-6xl">
              Step Into Style With A Faster, Cleaner Fashion Storefront
            </h1>

            <p className="mb-8 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
              Discover curated wardrobe staples, modern editorial styling, and a premium
              shopping experience built for speed and clarity.
            </p>

            <Link
              href="/shop"
              className="inline-flex items-center gap-2  bg-amber-900 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-amber-950"
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
