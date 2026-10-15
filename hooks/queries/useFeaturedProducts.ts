import { useQuery } from "@tanstack/react-query";
import { getFeaturedProducts } from "@/services/product.service";
import { productKeys } from "@/services/queries/query-keys";

export function useFeaturedProducts() {
  return useQuery({
    queryKey: productKeys.featured(),
    queryFn: getFeaturedProducts,
  });
}
