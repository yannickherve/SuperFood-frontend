import { Injectable } from '@angular/core';
import {Cart} from '../models/cart.model';
import {CartService} from './cart.service';
import {Product} from '../../products/models/product.model';
import {AlertService} from '@full-fledged/alerts';

@Injectable({
  providedIn: 'root'
})
export class HelperCartService {

  constructor(
    private cartService: CartService,
    private alertService: AlertService
  ) { }

  getTotalPrice(cart: Cart[]): number {
    let totalPrice = 0;
    for (const carValue of cart) {
      totalPrice = carValue.price * carValue.quantity;
    }
    return parseFloat(totalPrice.toFixed(2));
  }

}
