import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStorefrontPage } from "@/services/storefront.service";
import { ApiError } from "@/services/http-client";

interface AboutContent {
  hero?: { eyebrow?: string; title?: string; image?: { url?: string; alt?: string } };
  story?: {
    eyebrow?: string;
    heading?: string;
    body?: string;
    images?: { url: string; alt?: string }[];
    ctaLabel?: string;
    ctaHref?: string;
  };
  quote?: { text: string; author?: string; role?: string } | null;
  inspiration?: {
    heading?: string;
    body?: string;
    image?: { url?: string; alt?: string };
    ctaLabel?: string;
    ctaHref?: string;
  };
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string | null;
}

function ImageSlot({ src, alt, className }: { src?: string | null; alt: string; className: string }) {
  return (
    <div className={`relative overflow-hidden bg-gray-100 ${className}`}>
      {src && <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />}
    </div>
  );
}

export default async function AboutPage() {
  let page;
  try {
    page = await getStorefrontPage<AboutContent, TeamMember>("about");
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }
  const { hero, story, quote, inspiration } = page.content;
  const storyImages = story?.images ?? [];
  const teamSlots = page.teamMembers.length ? page.teamMembers : Array.from({ length: 3 }, (_, index) => ({ id: `empty-${index}`, name: "", role: "", imageUrl: null }));

  return (
    <div className="bg-white text-slate-700">
      <section className="relative flex h-[35vh] items-center justify-center overflow-hidden bg-gray-100">
        {hero?.image?.url && <Image src={hero.image.url} alt={hero.image.alt || hero.title || ""} fill priority sizes="100vw" className="object-cover brightness-50" />}
        <div className="relative z-10 max-w-3xl px-4 py-2 text-center text-white">
          <p className="mb-4 text-sm uppercase tracking-[0.2em] opacity-90">{hero?.eyebrow}</p>
          <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-7xl">{hero?.title}</h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <ImageSlot src={storyImages[0]?.url} alt={storyImages[0]?.alt || "Sustainable style"} className="h-64" />
              <ImageSlot src={storyImages[1]?.url} alt={storyImages[1]?.alt || "Quality fabrics"} className="h-48" />
            </div>
            <ImageSlot src={storyImages[2]?.url} alt={storyImages[2]?.alt || "Ethical sourcing"} className="h-full min-h-[400px]" />
          </div>
          <div className="max-w-xl space-y-6">
            <span className="font-sans text-xs uppercase tracking-[0.35em] text-amber-900">{story?.eyebrow}</span>
            <h2 className="font-heading text-3xl leading-snug tracking-[0.08em] text-gray-900 md:text-4xl">{story?.heading}</h2>
            <p className="whitespace-pre-line font-sans text-sm leading-relaxed text-gray-600 md:text-base">{story?.body}</p>
            {story?.ctaLabel && story.ctaHref && <Link href={story.ctaHref} className="group relative inline-flex items-center justify-center border border-gray-900 px-8 py-3 font-sans text-xs uppercase tracking-[0.3em] text-gray-900 transition-all duration-300 hover:bg-gray-900 hover:text-white">{story.ctaLabel}</Link>}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#686b74] py-12 text-center">
        <div className="absolute inset-0 bg-linear-to-b from-white via-gray-50 to-white opacity-80" />
        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <p className="font-heading text-xl italic leading-relaxed tracking-[0.05em] text-gray-800 md:text-2xl">{quote?.text}</p>
          <div className="mx-auto my-8 h-px w-14 bg-amber-900 opacity-70" />
          <p className="font-sans text-xs uppercase tracking-[0.35em] text-amber-900">{quote?.author}</p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-gray-500">{quote?.role}</p>
        </div>
      </section>

      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="mb-16 text-3xl font-bold text-slate-900">Meet Our Experts</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {teamSlots.map((member) => (
              <div key={member.id} className="group cursor-default">
                <ImageSlot src={member.imageUrl} alt={member.name} className="mx-auto mb-6 h-56 w-56 shadow-xl" />
                <h3 className="text-xl font-semibold text-slate-900">{member.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">
          <ImageSlot src={inspiration?.image?.url} alt={inspiration?.image?.alt || "Our Inspiration"} className="h-[500px] shadow-2xl" />
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-slate-900">{inspiration?.heading}</h2>
            <p className="whitespace-pre-line text-lg leading-relaxed text-slate-600">{inspiration?.body}</p>
            {inspiration?.ctaLabel && inspiration.ctaHref && <Link href={inspiration.ctaHref} className="inline-flex border-2 border-slate-900 px-10 py-4 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-900 hover:text-white">{inspiration.ctaLabel}</Link>}
          </div>
        </div>
      </section>
    </div>
  );
}
