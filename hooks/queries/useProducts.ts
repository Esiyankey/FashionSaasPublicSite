import { useQuery } from "@tanstack/react-query";
import type { ProductFilters } from "@/types/product";
import { getProducts } from "@/services/product.service";
import { productKeys } from "@/services/queries/query-keys";

export function useProducts(filters: ProductFilters = {}) {
  return useQuery({
    queryKey: productKeys.list(filters),
    queryFn: () => getProducts(filters),
  });
}
