import {Product} from '../../products/models/product.model';
import {User} from '../../auth/models/user';

export interface Cart {
  _id: string;
  quantity: number;
  product: Product;
  name: string;
  price: number;
  categoryProduct: string;
  user: User;
  createdAt: string;
  updatedAt: string;
}

export interface CartServerResponse {
  carts: Cart[];
  currentPage: number;
  pages: number;
  perPage: number;
  numOfCarts: number;
}
