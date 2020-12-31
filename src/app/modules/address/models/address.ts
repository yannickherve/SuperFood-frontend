import {User} from '../../auth/models/user';

enum CivilityDirection {
  M = 'M',
  Mme = 'Mme',
}

export interface Address {
  _id: string;
  user: User;
  professional: boolean;
  civility: CivilityDirection;
  company: string;
  full_name: string;
  address1: string;
  address2: string;
  bp: string;
  postcode: string;
  city: string;
  country: string;
  phone: string;
}

export interface AddressServerResponse {
  addresses: Address[];
  currentPage: number;
  pages: number;
  perPage: number;
  numOfAddress: number;
}
