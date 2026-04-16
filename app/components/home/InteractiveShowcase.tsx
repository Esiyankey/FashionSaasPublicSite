"use client";

import dynamic from "next/dynamic";

const ProductSlider = dynamic(
  () => import("@/app/components/product/ProductSlider").then((mod) => mod.ProductSlider),
  {
    loading: () => <SectionFallback title="Loading featured products..." />,
  },
);

const OutfitFinder = dynamic(
  () => import("@/app/components/OutfitFinder").then((mod) => mod.OutfitFinder),
  {
    loading: () => <SectionFallback title="Loading outfit finder..." />,
  },
);

function SectionFallback({ title }: { title: string }) {
  return (
    <section
      aria-busy="true"
      className="mx-auto w-full max-w-7xl px-4 py-16 text-center text-sm text-gray-500"
    >
      {title}
    </section>
  );
}

export function InteractiveShowcase() {
  return (
    <>
      <ProductSlider />
      <OutfitFinder />
    </>
  );
}
