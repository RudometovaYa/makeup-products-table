import { Tag } from "antd";
import type { MakeupProduct } from "../../types/makeup";

type Props = {
  colors: MakeupProduct["product_colors"];
};

export default function ProductColors({ colors }: Props) {
  if (colors.length === 0) {
    return <span>No colors available</span>;
  }

  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {colors.map((color, index) => (
        <Tag
          key={index}
          style={{
            backgroundColor: color.hex_value,
            color: "#fff",
            border: "none",
          }}
        >
          {color.colour_name || color.hex_value}
        </Tag>
      ))}
    </div>
  );
}
