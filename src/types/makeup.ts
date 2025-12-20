export type MakeupProduct = {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: string;
  product_type: string;
  image_link: string;
  product_tags: string[];
  product_colors: MakeupProductColor[];
};

export type MakeupProductColor = {
  hex_value: string;
  colour_name: string;
};

export type GroupRow = {
  key: string;
  title: string;
  isGroup: true;
  children: MakeupProduct[];
};

export type TableRow = MakeupProduct | GroupRow;
