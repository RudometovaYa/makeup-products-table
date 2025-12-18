export type MakeupProduct = {
  id: number;
  name: string;
  brand: string;
  category: string | null;
  price: string;
  product_type: string;
  image_link: string;
  product_colors: MakeupProductColor[];
};

export type MakeupProductColor = {
  hex_value: string;
  colour_name: string | null;
};
