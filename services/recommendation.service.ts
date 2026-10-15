import type { OutfitRecommendation, OutfitRecommendationInput } from "@/types/recommendation";
import { apiClient } from "./http-client";
import { mapProduct, type PublicProduct } from "./product.service";

export async function getOutfitRecommendation(
  input: OutfitRecommendationInput,
): Promise<OutfitRecommendation> {
  const result = await apiClient.post<{
    lookId: string;
    styleName: string;
    description: string;
    tags: string[];
    recommendedProducts: PublicProduct[];
    completeTheLook: PublicProduct[];
  }>("/outfit-finder/recommendations", { body: input });
  return {
    styleName: result.styleName,
    description: result.description,
    recommendedProducts: result.recommendedProducts.map(mapProduct),
    completeTheLook: result.completeTheLook.map(mapProduct),
  };
}
