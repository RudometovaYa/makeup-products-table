import { useEffect, useState } from "react";
import { Alert } from "antd";
import { fetchProducts } from "../services/makeupApi";
import ProductsTable from "../components/ ProductsTable/ ProductsTable";
import type { MakeupProduct } from "../types/makeup";

export default function ProductsPage() {
  const [products, setProducts] = useState<MakeupProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (error) {
    return <Alert type="error" message={error} />;
  }

  return <ProductsTable products={products} loading={loading} />;
}
