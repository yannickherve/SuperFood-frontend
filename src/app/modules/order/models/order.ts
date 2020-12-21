import {User} from '../../auth/models/user';
import {Product} from '../../products/models/product.model';

export enum PaymentDirection {
  card = 'card',
  mandate = 'mandate',
  transfer = 'transfer',
  check = 'check'
}
enum StatusDirection {
  NotProcessed= 'Not processed',
  Processing = 'Processing',
  Shipped = 'Shipped',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled'
}

export interface Order {
  _id: string;
  user: User;
  products: Product;
  amount: number;
  payment: PaymentDirection;
  status: StatusDirection;
  invoice_id: number;
  invoice_number: string;
  deliveryName: string;
  agree?: string;
}
