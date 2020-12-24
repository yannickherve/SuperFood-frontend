import { Injectable } from '@angular/core';
import {Cart} from '../models/cart.model';
import {CartService} from './cart.service';
import {AlertService} from '@full-fledged/alerts';

@Injectable({
  providedIn: 'root'
})
export class HelperCartService {

  constructor(
    private cartService: CartService,
    private alertService: AlertService
  ) { }

  getTotalPrice(carts: Cart[]): number {
    let total = 0;
    for (let index = 0; index < carts.length; index++) {
      const element = carts[index];
      total = +element.price + total;
    }
    return parseFloat(total.toFixed(2));
  }

}
