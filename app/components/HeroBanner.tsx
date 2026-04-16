import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section
      className="min-h-screen bg-cover bg-right relative overflow-hidden"
      style={{
        backgroundImage:
          'url(/images/hero-image-1.jpg)',
      }}
    >
      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-linear-to-r from-gray-50 via-gray-50/95 to-transparent"></div>

      

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="pt-10 lg:pt-0">
            {/* Badge */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-amber-700 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-amber-400 rounded-full" />
              </div>
              <span className="text-gray-700 text-sm font-medium">50% OFF Summer Super Sale</span>
            </div>
            <span className="text-sm font-medium text-gray-700">50% off summer super sale</span>
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
    </section>
  );
}
