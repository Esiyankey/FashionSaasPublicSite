import Link from "next/link";
import Image from "next/image";
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
     <section className="relative h-[35vh] flex flex-col items-center justify-center">
             <Image
               src="/images/hero-image-3.jpg"
               alt="Blog Header"
               fill
               priority
               className="object-cover brightness-75"
             />
             <div className="relative z-10 text-center text-white">
               <h1 className="text-5xl font-bold mb-3">Our Products</h1>
               <nav className="text-sm font-medium tracking-widest uppercase">
                 <Link href="/" className="hover:text-gray-300">
                   Home
                 </Link>
                 <span className="mx-2">&bull;</span>
                 <span className="opacity-70">Products</span>
               </nav>
             </div>
           </section>

      <section className="mx-auto max-w-[85rem] px-4 py-12">
        <ShopCatalog />
      </section>
    </div>
  );
}
