import { CategoryCards } from "./components/home/CategorySection";
import { Hero } from "./components/home/HeroBanner";
import { InteractiveShowcase } from "./components/home/InteractiveShowcase";
import { OutfitFinder } from "./components/outfit-finder/OutfitFinder";
import { getStorefrontHome } from "@/services/storefront.service";

export async function generateMetadata() {
  const { store } = await getStorefrontHome();
  return { title: store.seo.title, description: store.seo.description };
}

export default async function Home() {
  const storefront = await getStorefrontHome();
  return (
    <>
      <Hero storefront={storefront} />
      <CategoryCards />
      <InteractiveShowcase />
      <OutfitFinder/>
    </>
  );
}
