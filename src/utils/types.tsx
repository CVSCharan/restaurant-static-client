export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  is_veg: number;
  image_url: string;
  created_at: string;
}

export type ProductsProps = {
  productValue: Product[];
};

export interface CategoryList {
  name: string;
  imgUrl: string;
}
