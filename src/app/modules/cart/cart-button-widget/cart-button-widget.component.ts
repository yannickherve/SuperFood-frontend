import {Component, Input, OnInit} from '@angular/core';
import {CartService} from '../services/cart.service';
import {Product} from '../../products/models/product.model';
import {NgxSpinnerService} from 'ngx-spinner';
import {AlertService} from '@full-fledged/alerts';
import {HelperCartService} from '../services/helper-cart.service';
import {Cart} from '../models/cart.model';

@Component({
  selector: 'app-cart-button-widget',
  templateUrl: './cart-button-widget.component.html',
  styleUrls: ['./cart-button-widget.component.scss']
})
export class CartButtonWidgetComponent implements OnInit {
  @Input() product: Product;
  existingCart: Cart;

  constructor(
    private cartService: CartService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private helperCartService: HelperCartService,
  ) { }

  ngOnInit(): void {
  }

  addItemToCart(product: Product): void {
    const cartObserver = {
      next: (cartData) => {
        const newCart = cartData.carts.find( cartValue => cartValue.product._id === product._id);
        this.existingCart = newCart;
        if (newCart) {
          this.updateCartItem(newCart);
        } else {
          this.addCartItem(product);
        }
      },
      error: (error) => {
        console.log(error);
      }
    };
    this.cartService.getCart().subscribe(cartObserver);
  }

  updateCartItem(cart: Cart): void {
    this.cartService.updateCart(cart._id, cart.quantity + 1).subscribe({
      next: () => {
        this.alertService.success('qtity updated');
      },
      error: err => {
        this.alertService.danger('Erreur');
      }
    });
  }

  addCartItem(product: Product): void {
    this.cartService.addToCart({product: product._id}).subscribe({
      next: () => {
        this.alertService.success('Le produit à été ajouté au panier');
    },
      error: err => {
          this.alertService.danger('Erreur lor de l\'ajout au panier');
        }
    });
  }

}
