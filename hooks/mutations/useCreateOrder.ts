import { useMutation } from "@tanstack/react-query";
import { createOrder } from "@/services/order.service";

export function useCreateOrder() {
  return useMutation({
    mutationFn: createOrder,
  });
}
