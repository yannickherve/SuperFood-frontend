export interface Product {
  _id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  quantity: number;
  active: boolean;
  restaurant: boolean;
  color?: string;
  imageName: string;
}

export interface ServerResponse {
  products: Product[];
  currentPage: number;
  pages: number;
  perPage: number;
  numOfProducts: number;
}
