import { CategoryCards } from "./components/CategorySection";
import { Hero } from "./components/HeroBanner";
import { OutfitFinder } from "./components/OutfitFinder";
import { ProductSlider } from "./components/product/ProductSlider";

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryCards />
      <ProductSlider />
      <OutfitFinder />
    </>
  );
}
