import { useMutation } from "@tanstack/react-query";
import { getOutfitRecommendation } from "@/services/recommendation.service";

export function useOutfitRecommendation() {
  return useMutation({
    mutationFn: getOutfitRecommendation,
  });
}
