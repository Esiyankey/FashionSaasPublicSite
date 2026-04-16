import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { aboutImages, teamMembers } from "@/app/lib/about-data";
import { createMetadata } from "../lib/site";

export const metadata = createMetadata({
  title: "About Fashion SaaS",
  description:
    "Learn how Fashion SaaS blends editorial storytelling, sustainable design principles, and a fast shopping experience.",
  path: "/about",
  keywords: ["about fashion brand", "sustainable style", "fashion company"],
});

export default function AboutPage() {
  return (
    <div className="bg-white text-slate-700">
      <section className="relative flex h-[35vh] items-center justify-center overflow-hidden">
        <Image
          src={aboutImages.hero}
          alt="About Fashion SaaS"
          fill
          priority
          className="object-cover brightness-50"
        />
        <div className="relative z-10 max-w-3xl px-4 py-2 text-center text-white">
          <p className="mb-4 text-sm uppercase tracking-[0.2em] opacity-90">
            Welcome to Fashion SaaS
          </p>
          <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
            About Fashion SaaS
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative h-64 overflow-hidden">
                <Image src={aboutImages.collage1} alt="Sustainable style" fill className="object-cover" />
              </div>
              <div className="relative h-48 overflow-hidden">
                <Image src={aboutImages.collage2} alt="Quality fabrics" fill className="object-cover" />
              </div>
            </div>
            <div className="relative h-full min-h-[400px] overflow-hidden">
              <Image src={aboutImages.collage3} alt="Ethical sourcing" fill className="object-cover" />
            </div>
          </div>

          <div className="max-w-xl space-y-6">
            <span className="font-sans text-xs uppercase tracking-[0.35em] text-amber-900">
              The Result
            </span>

            <h2 className="text-3xl leading-snug tracking-[0.08em] text-gray-900 md:text-4xl">
              Sustainable Elegance
            </h2>

            <p className="font-sans text-sm leading-relaxed text-gray-600 md:text-base">
              We focus on thoughtful, ethical clothing. Our designs are simple, timeless,
              and crafted with a deep respect for sustainability. Each piece is created to
              last, designed with intention rather than excess.
            </p>

            <Link
              href="/shop"
              className="group relative inline-flex items-center justify-center border border-gray-900 px-8 py-3 text-xs uppercase tracking-[0.3em] text-gray-900 transition-all duration-300 hover:bg-gray-900 hover:text-white"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <section className="relative bg-[#686b74] py-12 text-center">
        <div className="absolute inset-0 bg-linear-to-b from-white via-gray-50 to-white opacity-80" />

        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <p className="text-xl italic leading-relaxed tracking-[0.05em] text-gray-800 md:text-2xl">
            &ldquo;Fashion SaaS is built on kindness, integrity, and timeless design,
            creating premium value through simplicity and intention.&rdquo;
          </p>

          <div className="mx-auto my-8 h-[1px] w-14 bg-amber-900 opacity-70" />

          <p className="font-sans text-xs uppercase tracking-[0.35em] text-amber-900">
            Robert Anthony
          </p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-gray-500">
            CEO & Founder, Fashion SaaS
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="mb-16 text-3xl font-bold text-slate-900">Meet Our Experts</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {teamMembers.map((member) => (
              <article key={member.name} className="group cursor-default">
                <div className="relative mx-auto mb-6 h-56 w-56 overflow-hidden shadow-xl">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{member.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{member.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">
          <div className="relative h-[500px] overflow-hidden shadow-2xl">
            <Image
              src={aboutImages.inspiration}
              alt="Our Inspiration"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-slate-900">
              Your Style Is Our Inspiration
            </h2>
            <p className="text-lg leading-relaxed text-slate-600">
              We look for the latest, best in quality clothing and accessories. Follow us
              on social media for new items, sales, and current updates. We look forward
              to your support.
            </p>
            <Link
              href="/shop"
              className="inline-flex border-2 border-slate-900 px-10 py-4 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-900 hover:text-white"
            >
              Shop The Collection
            </Link>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute bottom-8 right-8 rounded-full border border-slate-100 bg-white p-5 shadow-2xl transition-transform hover:scale-110"
        >
          <Search className="h-8 w-8 text-slate-900" />
        </div>
      </section>
    </div>
  );
}
