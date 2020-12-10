import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../models/product.model';
import {ProductService} from '../services/product.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.scss']
})
export class ProductHomeComponent implements OnInit {
  products: Product[];
  @Input() product: Product;

  constructor(
    private productService: ProductService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.showSpinner();
    this.loadProducts();
  }
  showSpinner(): void {
    this.spinner.show(undefined,
      {
        type: 'line-scale-party',
        size: 'medium',
        color: 'white',
        fullScreen: true
      }
    );
    setTimeout(() => this.spinner.hide(), 1000);
  }

  loadProducts(): void {
    const productsObserver = {
      next: (response) => {
        console.log(response);
        this.products = response.products;
      },
      error: (err) => {
        console.log(err);
      }
    };
    this.productService.getProducts().subscribe(productsObserver);
  }

  addItemToCart(product: Product): void {
    console.log(product);
  }

}
