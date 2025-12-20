import type { MakeupProduct } from "../types/makeup";

export function groupProducts(
  products: MakeupProduct[],
  groupBy: "brand" | "category" | "type"
) {
  const map = new Map<string, MakeupProduct[]>();

  products.forEach((product) => {
    let key = "";

    if (groupBy === "brand") key = product.brand;
    if (groupBy === "category") key = product.category ?? "Other";
    if (groupBy === "type") key = product.product_type;

    if (!map.has(key)) {
      map.set(key, []);
    }

    map.get(key)!.push(product);
  });

  return Array.from(map.entries()).map(([key, items]) => ({
    key,
    name: key,
    children: items,
  }));
}
