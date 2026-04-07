import { CategoryCards } from "./components/CategorySection";
import { Hero } from "./components/HeroBanner";
import { LimitedOffer } from "./components/LimitedOffer";
import { ProductSlider } from "./components/product/ProductSlider";


export default function Home() {
  return (
    <>
    <Hero/>
    <CategoryCards/>
    <ProductSlider/>
    <LimitedOffer/>
    </>
  );
}
