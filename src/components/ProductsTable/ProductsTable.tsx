import { Image, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { MakeupProduct, TableRow } from "../../types/makeup";
import ProductsRow from "./ProductRow";

function isProduct(row: TableRow): row is MakeupProduct {
  return "product_colors" in row;
}

type Props = {
  products: TableRow[];
  loading: boolean;
};

export default function ProductsTable({ products, loading }: Props) {
  const columns: ColumnsType<TableRow> = [
    Table.EXPAND_COLUMN,

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
        isProduct(record) ? record.name : <strong>{record.name}</strong>,
    },
    {
      title: "Category",
      key: "category",
      render: (_, record) =>
        isProduct(record) ? record.category ?? "—" : undefined,
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
      rowKey={(record) => (isProduct(record) ? record.id : record.key)}
      loading={loading}
      columns={columns}
      dataSource={products}
      expandable={{
        expandedRowRender: (record) =>
          isProduct(record) ? <ProductsRow product={record} /> : undefined,
        rowExpandable: (record) =>
          isProduct(record) && record.product_colors.length > 0,
      }}
      pagination={{ pageSize: 10 }}
    />
  );
}
