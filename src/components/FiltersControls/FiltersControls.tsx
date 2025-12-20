import { Select, Switch, Space, Typography } from "antd";

type GroupBy = "brand" | "category" | "type" | "none";

type Props = {
  brands: string[];
  tags: string[];

  selectedBrands: string[];
  selectedTags: string[];
  groupBy: GroupBy;

  onBrandsChange: (value: string[]) => void;
  onTagsChange: (value: string[]) => void;
  onGroupChange: (value: GroupBy) => void;
};

const { Title, Text } = Typography;

export default function FiltersControls({
  brands,
  tags,
  selectedBrands,
  selectedTags,
  groupBy,
  onBrandsChange,
  onTagsChange,
  onGroupChange,
}: Props) {
  const handleGroupToggle = (value: Exclude<GroupBy, "none">) => {
    onGroupChange(groupBy === value ? "none" : value);
  };

  return (
    <Space orientation="vertical" size="large" style={{ width: "100%" }}>
      <Title level={4}>Filters</Title>

      <Space wrap align="center">
        <Text>Group by type</Text>
        <Switch
          checked={groupBy === "type"}
          onChange={() => handleGroupToggle("type")}
        />

        <Text>Group by brand</Text>
        <Switch
          checked={groupBy === "brand"}
          onChange={() => handleGroupToggle("brand")}
        />

        <Text>Group by category</Text>
        <Switch
          checked={groupBy === "category"}
          onChange={() => handleGroupToggle("category")}
        />
      </Space>

      <Select
        mode="multiple"
        allowClear
        placeholder="Filter by brands"
        style={{ width: 320 }}
        value={selectedBrands}
        options={brands.map((brand) => ({
          label: brand,
          value: brand,
        }))}
        onChange={onBrandsChange}
      />

      <Select
        mode="multiple"
        allowClear
        placeholder="Filter by tags"
        style={{ width: 320 }}
        value={selectedTags}
        options={tags.map((tag) => ({
          label: tag,
          value: tag,
        }))}
        onChange={onTagsChange}
      />
    </Space>
  );
}
