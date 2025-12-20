import type { MakeupProduct, GroupRow } from "../types/makeup";

export function groupProducts(
  products: MakeupProduct[],
  groupBy: "brand" | "category" | "type"
): GroupRow[] {
  const map = new Map<string, MakeupProduct[]>();

  for (const product of products) {
    let key: string;

    switch (groupBy) {
      case "brand":
        key = product.brand;
        break;
      case "category":
        key = product.category;
        break;
      case "type":
        key = product.product_type;
        break;
    }

    const group = map.get(key);
    if (group) {
      group.push(product);
    } else {
      map.set(key, [product]);
    }
  }

  return Array.from(map.entries()).map(([key, items]) => ({
    key,
    title: key,
    isGroup: true,
    children: items,
  }));
}
