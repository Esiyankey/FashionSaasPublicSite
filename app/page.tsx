import { CategoryCards } from "./components/CategorySection";
import { Hero } from "./components/HeroBanner";
import { InteractiveShowcase } from "./components/home/InteractiveShowcase";
import { OutfitFinder } from "./components/OutfitFinder";
import { createMetadata } from "./lib/site";

export const metadata = createMetadata({
  title: "Modern Fashion Storefront",
  description:
    "Explore curated apparel, fast-loading product discovery, and editorial fashion content built with server-first rendering.",
  path: "/",
  keywords: ["fashion", "ecommerce", "style inspiration", "modern storefront"],
});

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryCards />
      <InteractiveShowcase />
      <OutfitFinder/>
    </>
  );
}
