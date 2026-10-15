import type { CreateOrderInput, Order } from "@/types/order";
import { apiClient } from "./http-client";

const ORDER_TOKENS_KEY = "fashion-saas-order-tokens";

interface PublicOrder {
  orderNumber: string;
  status: Order["status"];
  paymentMethod: Order["paymentMethod"];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  currency: string;
  shippingAddress?: Order["shippingAddress"];
  createdAt: string;
  items: {
    productId: string | null;
    variantId: string | null;
    name: string;
    image: string | null;
    unitPrice: number;
    compareAtPrice: number | null;
    size: string | null;
    color: string | null;
    quantity: number;
  }[];
}

interface PlacedOrder extends PublicOrder {
  accessToken: string;
}

function rememberToken(orderNumber: string, accessToken: string) {
  if (typeof window === "undefined") return;
  try {
    const saved = JSON.parse(window.localStorage.getItem(ORDER_TOKENS_KEY) || "{}") as Record<string, string>;
    saved[orderNumber] = accessToken;
    window.localStorage.setItem(ORDER_TOKENS_KEY, JSON.stringify(saved));
  } catch {
    window.localStorage.setItem(ORDER_TOKENS_KEY, JSON.stringify({ [orderNumber]: accessToken }));
  }
}

function readToken(orderNumber: string): string | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    return (JSON.parse(window.localStorage.getItem(ORDER_TOKENS_KEY) || "{}") as Record<string, string>)[orderNumber];
  } catch {
    window.localStorage.removeItem(ORDER_TOKENS_KEY);
    return undefined;
  }
}

function mapOrder(order: PublicOrder): Order {
  return {
    ...order,
    id: order.orderNumber,
    items: order.items.map((item) => ({
      cartItemId: `${item.productId ?? "removed"}-${item.variantId ?? "default"}`,
      productId: item.productId ?? "",
      variantId: item.variantId,
      name: item.name,
      image: item.image ?? "",
      price: item.unitPrice,
      originalPrice: item.compareAtPrice,
      currency: order.currency,
      category: "",
      size: item.size ?? "One Size",
      color: item.color ?? "Default",
      quantity: item.quantity,
    })),
  };
}

export async function createOrder(input: CreateOrderInput): Promise<Order> {
  const placed = await apiClient.post<PlacedOrder>("/checkout", {
    body: {
      shippingAddress: input.shippingAddress,
      items: input.items.map(({ productId, variantId, size, color, quantity }) => ({
        productId,
        ...(variantId ? { variantId } : { size, color }),
        quantity,
      })),
      paymentMethod: input.paymentMethod,
    },
  });
  rememberToken(placed.orderNumber, placed.accessToken);
  return mapOrder(placed);
}

export async function getOrders(): Promise<Order[]> {
  // There is no public customer account or order-history endpoint.
  return [];
}

export async function getOrderById(id: string): Promise<Order | undefined> {
  const token = readToken(id);
  if (!token) return undefined;
  return mapOrder(await apiClient.get<PublicOrder>(`/orders/${encodeURIComponent(id)}`, { params: { token } }));
}

export async function cancelOrder(id: string): Promise<Order | undefined> {
  const token = readToken(id);
  if (!token) return undefined;
  return mapOrder(await apiClient.post<PublicOrder>(`/orders/${encodeURIComponent(id)}/cancel`, { params: { token } }));
}
