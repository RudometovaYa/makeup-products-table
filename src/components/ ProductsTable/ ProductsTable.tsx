import { Image, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { MakeupProduct } from "../../types/makeup";
import ProductsRow from "./ProductRow";

type Props = {
  products: MakeupProduct[];
  loading: boolean;
};

export default function ProductsTable({ products, loading }: Props) {
  const columns: ColumnsType<MakeupProduct> = [
    {
      title: "Image",
      dataIndex: "image_link",
      key: "image",
      render: (src) => (
        <Image
          width={48}
          src={src || "/placeholder.jpg"}
          alt="product"
          fallback="/placeholder.jpg"
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (value) => value ?? "—",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (value) => `$${value}`,
    },
    {
      title: "Product type",
      dataIndex: "product_type",
      key: "product_type",
      render: (type) => <Tag color="blue">{type}</Tag>,
    },
  ];

  return (
    <Table
      rowKey="id"
      loading={loading}
      columns={columns}
      dataSource={products}
      expandable={{
        expandedRowRender: (record) => <ProductsRow product={record} />,
        rowExpandable: (record) => record.product_colors.length > 0,
      }}
    />
  );
}
