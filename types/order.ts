import type { CartItem } from "./cart";

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentMethodId = "card" | "wallet" | "cod";

export interface ShippingAddress {
  fullName: string;
  email: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  country?: string;
}

export interface Order {
  id: string;
  businessId?: string;
  customerId?: string;
  items: CartItem[];
  status: OrderStatus;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  currency: string;
  shippingAddress?: ShippingAddress;
  paymentMethod: PaymentMethodId;
  createdAt: string;
}

export interface CreateOrderInput {
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: "cod";
}
