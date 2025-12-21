import type { MakeupProduct } from "../types/makeup";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("VITE_API_BASE_URL is not defined");
}

export async function fetchProducts(): Promise<MakeupProduct[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products.json`);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data: MakeupProduct[] = await response.json();
    return data;
  } catch (error) {
    console.error("fetchProducts error:", error);
    throw error;
  }
}
