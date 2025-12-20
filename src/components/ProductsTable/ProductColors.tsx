import { Space, Tag, Typography } from "antd";
import type { MakeupProduct } from "../../types/makeup";

const { Text } = Typography;

type Props = {
  colors: MakeupProduct["product_colors"];
};

export default function ProductColors({ colors }: Props) {
  if (colors.length === 0) {
    return <Text type="secondary">No colors available</Text>;
  }

  return (
    <Space wrap>
      {colors.map((color) => (
        <Tag
          key={color.hex_value}
          style={{
            backgroundColor: color.hex_value,
            color: "#fff",
            border: "none",
          }}
        >
          {color.colour_name || color.hex_value}
        </Tag>
      ))}
    </Space>
  );
}
