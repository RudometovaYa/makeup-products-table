import type { MakeupProduct } from "../types/makeup";

const BASE_URL = "https://makeup-api.herokuapp.com/api/v1/products.json";

export async function fetchProducts(): Promise<MakeupProduct[]> {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}
