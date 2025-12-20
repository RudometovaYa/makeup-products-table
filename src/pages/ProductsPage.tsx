import { useEffect, useState } from "react";
import { Alert, Spin, Space } from "antd";

import { fetchProducts } from "../services/makeupApi";
import ProductsTable from "../components/ProductsTable/ProductsTable";
import FiltersControls from "../components/FiltersControls/FiltersControls";
import { groupProducts } from "../utils/groupProducts";

import type { MakeupProduct, TableRow } from "../types/makeup";

type GroupBy = "brand" | "category" | "type";

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState<MakeupProduct[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<TableRow[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [groupBy, setGroupBy] = useState<GroupBy | undefined>(undefined);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError(undefined);

        const data = await fetchProducts();
        setAllProducts(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  useEffect(() => {
    let result: MakeupProduct[] = [...allProducts];

    if (selectedBrands.length > 0) {
      result = result.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }

    if (selectedTags.length > 0) {
      result = result.filter((product) =>
        product.product_tags?.some((tag) => selectedTags.includes(tag))
      );
    }

    if (groupBy) {
      setVisibleProducts(groupProducts(result, groupBy));
    } else {
      setVisibleProducts(result);
    }
  }, [allProducts, selectedBrands, selectedTags, groupBy]);

  if (error) {
    return <Alert type="error" message={error} />;
  }

  if (loading) {
    return <Spin />;
  }

  const brands = Array.from(new Set(allProducts.map((p) => p.brand)));
  const tags = Array.from(
    new Set(allProducts.flatMap((p) => p.product_tags ?? []))
  );

  return (
    <Space orientation="vertical" size="large" style={{ width: "100%" }}>
      <FiltersControls
        brands={brands}
        tags={tags}
        selectedBrands={selectedBrands}
        selectedTags={selectedTags}
        groupBy={groupBy}
        onBrandsChange={setSelectedBrands}
        onTagsChange={setSelectedTags}
        onGroupChange={setGroupBy}
      />

      <ProductsTable products={visibleProducts} loading={loading} />
    </Space>
  );
}
