import { useEffect, useState } from "react";
import { Alert, Spin, Space, Collapse, Typography } from "antd";

import { fetchProducts } from "../services/makeupApi";
import ProductsTable from "../components/ProductsTable/ProductsTable";
import FiltersControls from "../components/FiltersControls/FiltersControls";

import type { MakeupProduct } from "../types/makeup";

const { Text } = Typography;

export type GroupBy = "none" | "brand" | "category" | "type";

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState<MakeupProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [groupBy, setGroupBy] = useState<GroupBy>("none");

  useEffect(() => {
    const load = async () => {
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

    load();
  }, []);

  const filteredProducts = allProducts
    .filter((p) =>
      selectedBrands.length > 0 ? selectedBrands.includes(p.brand) : true
    )
    .filter((p) =>
      selectedTags.length > 0
        ? p.product_tags.some((tag) => selectedTags.includes(tag))
        : true
    );

  const groupValues =
    groupBy === "none"
      ? []
      : Array.from(
          new Set(
            filteredProducts.map((p) => {
              if (groupBy === "brand") return p.brand;
              if (groupBy === "category") return p.category;
              return p.product_type;
            })
          )
        );

  const brands = Array.from(new Set(allProducts.map((p) => p.brand))).filter(
    (brand): brand is string => Boolean(brand)
  );
  const tags = Array.from(
    new Set(allProducts.flatMap((p) => p.product_tags))
  ).filter((tag): tag is string => Boolean(tag));

  if (loading) return <Spin />;
  if (error) return <Alert type="error" description={error} />;

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

      {groupBy === "none" && (
        <ProductsTable products={filteredProducts} loading={loading} />
      )}

      {groupBy !== "none" && (
        <Collapse
          accordion
          items={groupValues.map((value) => {
            const groupProducts = filteredProducts.filter((p) => {
              if (groupBy === "brand") return p.brand === value;
              if (groupBy === "category") return p.category === value;
              return p.product_type === value;
            });

            return {
              key: value,
              label: <Text strong>{value}</Text>,
              children: (
                <ProductsTable products={groupProducts} loading={loading} />
              ),
            };
          })}
        />
      )}
    </Space>
  );
}
