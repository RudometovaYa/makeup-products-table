import { Image, Table, Tag, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { MakeupProduct } from "../../types/makeup";
import ProductsRow from "./ProductRow";

import { PlusSquareOutlined, MinusSquareOutlined } from "@ant-design/icons";

type Props = {
  products: MakeupProduct[];
  loading: boolean;
};

export default function ProductsTable({ products, loading }: Props) {
  const columns: ColumnsType<MakeupProduct> = [
    {
      title: "Image",
      key: "image",
      render: (_, record) => (
        <Image
          width={48}
          src={record.image_link || "/placeholder.jpg"}
          fallback="/placeholder.jpg"
          alt={record.name}
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
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Price",
      key: "price",
      render: (_, record) => (record.price ? `$${record.price}` : "—"),
    },
    {
      title: "Product type",
      key: "product_type",
      render: (_, record) => <Tag color="blue">{record.product_type}</Tag>,
    },
  ];
  return (
    <Table<MakeupProduct>
      rowKey="id"
      loading={loading}
      columns={columns}
      dataSource={products}
      expandable={{
        rowExpandable: (record) =>
          Array.isArray(record.product_colors) &&
          record.product_colors.length > 0,

        expandedRowRender: (record) => <ProductsRow product={record} />,

        expandIcon: ({ expanded, onExpand, record }) => {
          const hasColors =
            Array.isArray(record.product_colors) &&
            record.product_colors.length > 0;

          if (!hasColors) return null;

          return (
            <Tooltip title="Show product colors">
              <span
                role="button"
                aria-label="Toggle product colors"
                onClick={(e) => onExpand(record, e)}
                style={{ cursor: "pointer" }}
              >
                {expanded ? <MinusSquareOutlined /> : <PlusSquareOutlined />}
              </span>
            </Tooltip>
          );
        },
      }}
      pagination={{ pageSize: 10 }}
    />
  );
}
