import { useEffect, useState } from "react";
import { Alert, Spin, Space, Collapse, Typography } from "antd";

import { fetchProducts } from "../services/makeupApi";
import ProductsTable from "../components/ProductsTable/ProductsTable";
import FiltersControls from "../components/FiltersControls/FiltersControls";

import type { MakeupProduct, GroupRow } from "../types/makeup";
import { TAG_OPTIONS } from "../constants/tags";

import { groupProducts } from "../utils/groupProducts";

import { Layout } from "antd";

const { Text } = Typography;
const { Content } = Layout;

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
        ? p.product_tags?.some((tag) => selectedTags.includes(tag)) ?? false
        : true
    );

  const groupedRows: GroupRow[] =
    groupBy === "none" ? [] : groupProducts(filteredProducts, groupBy);

  const brands = Array.from(new Set(allProducts.map((p) => p.brand))).filter(
    (brand): brand is string => Boolean(brand)
  );
  const tags = TAG_OPTIONS;

  if (loading) {
    return (
      <Layout>
        <Content style={{ padding: 48, textAlign: "center" }}>
          <Spin size="large" />
        </Content>
      </Layout>
    );
  }
  if (error) {
    return (
      <Layout>
        <Content style={{ maxWidth: 600, margin: "40px auto" }}>
          <Alert type="error" message="Error" description={error} showIcon />
        </Content>
      </Layout>
    );
  }

  const resetFilters = () => {
    setSelectedBrands([]);
    setSelectedTags([]);
    setGroupBy("none");
  };

  return (
    <Layout>
      <Content
        style={{
          maxWidth: 1200,
          width: "100%",
          margin: "0 auto",
          padding: 24,
        }}
      >
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
            onReset={resetFilters}
          />

          {!loading && groupBy === "none" && filteredProducts.length === 0 && (
            <Alert
              type="info"
              title="No products found"
              description="Try changing or resetting filters"
              showIcon
            />
          )}

          {groupBy === "none" && (
            <ProductsTable products={filteredProducts} loading={loading} />
          )}

          {groupBy !== "none" && (
            <Collapse
              accordion
              items={groupedRows.map((group) => ({
                key: group.key,
                label: <Text strong>{group.title}</Text>,
                children: (
                  <ProductsTable products={group.children} loading={false} />
                ),
              }))}
            />
          )}
        </Space>
      </Content>
    </Layout>
  );
}
