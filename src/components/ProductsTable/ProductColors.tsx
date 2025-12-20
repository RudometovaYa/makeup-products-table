import { List, Tag } from "antd";
import type { MakeupProduct } from "../../types/makeup";

type Props = {
  colors: MakeupProduct["product_colors"];
};

export default function ProductColors({ colors }: Props) {
  if (colors.length === 0) {
    return <span>No colors available</span>;
  }

  return (
    <List
      dataSource={colors}
      renderItem={(color) => (
        <List.Item style={{ padding: 0, border: "none" }}>
          <Tag
            style={{
              backgroundColor: color.hex_value,
              color: "#fff",
              border: "none",
            }}
          >
            {color.colour_name ?? color.hex_value}
          </Tag>
        </List.Item>
      )}
      split={false}
    />
  );
}
