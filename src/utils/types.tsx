export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  is_veg: number;
  image_url: string;
  created_at: string;
  isActive: number;
}

export type ProductsProps = {
  productValue: Product[];
};

export interface CategoryList {
  name: string;
  imgUrl: string;
}

export interface RestaurantUser {
  id: string;
  name: string;
  email: string;
  role: string;
  token?: string;
  loggedInAt: string;
}
