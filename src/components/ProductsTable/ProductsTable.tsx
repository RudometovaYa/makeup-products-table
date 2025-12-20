import { Image, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { MakeupProduct, TableRow, GroupRow } from "../../types/makeup";
import ProductsRow from "./ProductRow";

const { Text } = Typography;

function isGroup(row: TableRow): row is GroupRow {
  return "isGroup" in row;
}

function isProduct(row: TableRow): row is MakeupProduct {
  return !("isGroup" in row);
}

type Props = {
  products: TableRow[];
  loading: boolean;
};

export default function ProductsTable({ products, loading }: Props) {
  const columns: ColumnsType<TableRow> = [
    {
      title: "Image",
      key: "image",
      render: (_, record) =>
        isProduct(record) ? (
          <Image
            width={48}
            src={record.image_link || "/placeholder.jpg"}
            fallback="/placeholder.jpg"
            alt={record.name}
          />
        ) : undefined,
    },
    {
      title: "Name",
      key: "name",
      render: (_, record) =>
        isGroup(record) ? <Text strong>{record.title}</Text> : record.name,
    },
    {
      title: "Category",
      key: "category",
      render: (_, record) => (isProduct(record) ? record.category : undefined),
    },
    {
      title: "Brand",
      key: "brand",
      render: (_, record) => (isProduct(record) ? record.brand : undefined),
    },
    {
      title: "Price",
      key: "price",
      render: (_, record) =>
        isProduct(record) ? `$${record.price}` : undefined,
    },
    {
      title: "Product type",
      key: "product_type",
      render: (_, record) =>
        isProduct(record) ? (
          <Tag color="blue">{record.product_type}</Tag>
        ) : undefined,
    },
  ];

  return (
    <Table<TableRow>
      rowKey={(record) => (isGroup(record) ? record.key : record.id)}
      loading={loading}
      columns={columns}
      dataSource={products}
      expandable={{
        rowExpandable: (record) =>
          isGroup(record) ||
          (isProduct(record) && record.product_colors.length > 0),

        expandedRowRender: (record) =>
          isProduct(record) ? <ProductsRow product={record} /> : undefined,
      }}
      pagination={{ pageSize: 10 }}
    />
  );
}
