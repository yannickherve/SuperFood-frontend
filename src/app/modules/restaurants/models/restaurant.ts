import {User} from '../../auth/models/user';
import {Address} from '../../../shared/models/address';

enum StatusDirection {
  Open = 'Open',
  Close = 'Close',
}

export interface Restaurant {
  _id: string;
  name: string;
  description: string;
  email: string;
  image: string;
  status: StatusDirection;
  rating?: number;
  wallet?: number;
  user: User;
  address: Address;
}

export interface RestaurantServerResponse {
  restaurants: Restaurant;
  currentPage: number;
  pages: number;
  perPage: number;
  numOfRestaurants: number;
}
