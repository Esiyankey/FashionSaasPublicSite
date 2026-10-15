import type { Customer } from "@/types/customer";
import { apiClient } from "./http-client";

export async function getCurrentCustomer(): Promise<Customer> {
  return apiClient.get<Customer>("/customers/me");
}

export async function updateCustomer(input: Partial<Pick<Customer, "name" | "addresses">>): Promise<Customer> {
  return apiClient.patch<Customer>("/customers/me", { body: input });
}
