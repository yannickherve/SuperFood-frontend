import {Component, Input, OnInit} from '@angular/core';
import {CartService} from '../services/cart.service';
import {Product} from '../../products/models/product.model';
import {NgxSpinnerService} from 'ngx-spinner';
import {AlertService} from '@full-fledged/alerts';

@Component({
  selector: 'app-cart-button-widget',
  templateUrl: './cart-button-widget.component.html',
  styleUrls: ['./cart-button-widget.component.scss']
})
export class CartButtonWidgetComponent implements OnInit {
  @Input() product: Product;

  constructor(
    private cartService: CartService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }

  addItemToCart(product: Product): void {
    console.log(product);
    const data = {
      product: product._id
    };
    const cartObserver = {
      next: response => {
        this.alertService.success('Le produit à été ajouté au panier');
      },
      error: err => {
        console.log(err);
        this.alertService.danger('Erreur lor de l\'ajout au panier');
      }
    };
    this.cartService.addToCart(data).subscribe(cartObserver);
  }

}
