import ProductColors from "../ ProductsTable/ProductColors";
import type { MakeupProduct } from "../../types/makeup";

type Props = {
  product: MakeupProduct;
};

export default function ProductsRow({ product }: Props) {
  return <ProductColors colors={product.product_colors} />;
}
