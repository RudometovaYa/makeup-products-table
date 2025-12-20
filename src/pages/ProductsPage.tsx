import { useEffect, useState } from "react";
import { Alert, Spin, Space } from "antd";

import { fetchProducts } from "../services/makeupApi";
import ProductsTable from "../components/ProductsTable/ProductsTable";
import FiltersControls from "../components/FiltersControls/FiltersControls";
import { groupProducts } from "../utils/groupProducts";

import type { MakeupProduct, TableRow } from "../types/makeup";

export type GroupBy = "none" | "brand" | "category" | "type";

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState<MakeupProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [groupBy, setGroupBy] = useState<GroupBy>("none");

  // ===== Fetch products =====
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await fetchProducts();
        setAllProducts(data);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // ===== Filtering =====
  const filteredProducts: MakeupProduct[] = allProducts
    .filter((product) =>
      selectedBrands.length > 0 ? selectedBrands.includes(product.brand) : true
    )
    .filter((product) =>
      selectedTags.length > 0
        ? product.product_tags.some((tag) => selectedTags.includes(tag))
        : true
    );

  // ===== Grouping =====
  const tableData: TableRow[] =
    groupBy === "none"
      ? filteredProducts
      : groupProducts(filteredProducts, groupBy);

  // ===== Options for filters =====
  const brands: string[] = Array.from(new Set(allProducts.map((p) => p.brand)));

  const tags: string[] = Array.from(
    new Set(allProducts.flatMap((p) => p.product_tags).filter((tag) => tag))
  );

  // ===== UI states =====
  if (loading) {
    return <Spin />;
  }

  if (error) {
    return <Alert type="error" showIcon description={error} />;
  }

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

      <ProductsTable products={tableData} loading={loading} />
    </Space>
  );
}
