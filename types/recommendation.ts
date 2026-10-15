import type { Product } from "./product";

export interface OutfitRecommendationInput {
  bodyType: string;
  skinTone: string;
  occasion: string;
}

export interface OutfitRecommendation {
  styleName: string;
  description: string;
  recommendedProducts: Product[];
  completeTheLook: Product[];
}
