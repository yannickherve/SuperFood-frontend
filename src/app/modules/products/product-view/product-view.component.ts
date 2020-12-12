import { Component, OnInit } from '@angular/core';
import {Product} from '../models/product.model';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../services/product.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  product: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    const observer = {
      next: product => {
        this.product = product;
        setTimeout(() => {
          this.spinner.hide();
        }, 800);
      },
      error: err => {
        this.spinner.hide();
      }
    };
    this.productService.getProduct(this.route.snapshot.paramMap.get('id'))
      .subscribe(observer);
  }

}
