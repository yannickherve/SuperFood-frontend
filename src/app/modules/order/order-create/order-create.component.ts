import { Component, OnInit } from '@angular/core';
import {AddressService} from '../../../shared/services/address.service';
import {Address} from '../../../shared/models/address';
import {FormBuilder, Validators} from '@angular/forms';
import {OrderService} from '../services/order.service';
import {CartService} from '../../cart/services/cart.service';
import {CartServerResponse} from '../../cart/models/cart.model';
import {HelperCartService} from '../../cart/services/helper-cart.service';
import {concatMap, delay, map} from 'rxjs/operators';
import {of} from 'rxjs';
import {log} from 'util';
import {AlertService} from '@full-fledged/alerts';
import {Router} from '@angular/router';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.scss']
})
export class OrderCreateComponent implements OnInit {
  addresses: Address[];
  paymentValue: string[] = ['card', 'mandate', 'transfer', 'check'];
  paymentTemporary: string;
  carts: CartServerResponse;
  orderForm = this.fb.group({
    address: [null, Validators.required],
    amount: [null, Validators.required],
    payment: ['card', Validators.required],
    agree: [null, Validators.required]
  });

  constructor(
    private addressService: AddressService,
    private orderService: OrderService,
    private cartService: CartService,
    private helperCartService: HelperCartService,
    private alertService: AlertService,
    private route: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getUserAddress();
    this.retrieveCart();
  }

  getUserAddress(): void {
    const addressObserver = {
      next: address => {
        this.addresses = address.addresses;
      },
      error: error => {
        this.alertService.danger(error);
      }
    };
    this.addressService.getAddress().subscribe(addressObserver);
  }
  retrieveCart(): void {
    const retrieveObserver = {
      next: data => {
        this.orderForm.patchValue({
          amount: this.getTotalPrice()
        });
      },
      error: err => {
        this.alertService.danger(err);
      }
    };
    this.cartService.getCart().pipe(
      map(cartData => this.carts = cartData)
    ).subscribe(retrieveObserver);
  }

  getTotalPrice(): number {
    return this.helperCartService.getTotalPrice(this.carts.carts);
  }

  createOrder(): void {
    const orderObserver = {
      next: order => {
        this.reinitializeCart();
      },
      error: error => {
        this.alertService.danger(error);
      }
    };
    this.orderService.createOrder(this.orderForm.value).subscribe(orderObserver);
  }

  reinitializeCart(): any {
    const deleteObserver = {
      next: res => {
        this.alertService.success('La commande a été effectuée');
        this.route.navigate(['/products-center/products']).then(() => {});
        this.cartService.getCart().subscribe();
      },
      error: err => {
        this.alertService.danger(err);
      }
    };
    this.carts.carts.forEach(item => {
      const source = of(item._id);
      source.pipe(
        concatMap(() => this.cartService.removeFromCart(item._id))
      ).subscribe(deleteObserver);
    });
  }
}
