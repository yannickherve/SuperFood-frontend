import {Component, OnDestroy, OnInit} from '@angular/core';
import {Address, AddressServerResponse} from '../../address/models/address';
import {FormBuilder, Validators} from '@angular/forms';
import {OrderService} from '../services/order.service';
import {CartService} from '../../cart/services/cart.service';
import {CartServerResponse} from '../../cart/models/cart.model';
import {HelperCartService} from '../../cart/services/helper-cart.service';
import {concatMap, delay, map} from 'rxjs/operators';
import {of, Subscription} from 'rxjs';
import {AlertService} from '@full-fledged/alerts';
import {Router} from '@angular/router';
import {AddressService} from '../../address/services/address.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.scss']
})
export class OrderCreateComponent implements OnInit, OnDestroy {
  addresses: AddressServerResponse;
  paymentValue: string[] = ['card', 'mandate', 'transfer', 'check'];
  paymentTemporary: string;
  carts: CartServerResponse;
  orderForm = this.fb.group({
    address: [null, Validators.required],
    amount: [null, Validators.required],
    payment: ['card', Validators.required],
    agree: [null, Validators.required]
  });
  getUserAddressSubs: Subscription;
  getCartSubs: Subscription;

  constructor(
    private addressService: AddressService,
    private orderService: OrderService,
    private cartService: CartService,
    private helperCartService: HelperCartService,
    private alertService: AlertService,
    private route: Router,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
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
    this.getUserAddressSubs = this.addressService.getAddresses().subscribe(addressObserver);
  }

  retrieveCart(): void {
    this.spinner.show();
    const retrieveObserver = {
      next: data => {
        this.orderForm.patchValue({
          amount: this.getTotalPrice()
        });
        this.spinner.hide();
      },
      error: err => {
        this.alertService.danger(err);
      }
    };
    this.getCartSubs = this.cartService.getCart().pipe(
      map(cartData => this.carts = cartData)
    ).subscribe(retrieveObserver);
  }

  getTotalPrice(): number {
    return this.helperCartService.getTotalPrice(this.carts.carts);
  }

  createOrder(): void {
    this.spinner.show();
    const orderObserver = {
      next: order => {
        setTimeout(() => {
          this.reinitializeCart();
        }, 600);
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
        this.spinner.hide();
        this.route.navigate(['/products-center/products']).then(() => {});
        this.getCartSubs = this.cartService.getCart().subscribe();
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

  ngOnDestroy(): void {
    if (this.getUserAddressSubs) {
      this.getUserAddressSubs.unsubscribe();
    }
  }
}
