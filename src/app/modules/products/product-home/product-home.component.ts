import {Component, Input, OnInit} from '@angular/core';
import {Product, ProductServerResponse} from '../models/product.model';
import {ProductService} from '../services/product.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {map} from 'rxjs/operators';
import {PageEvent} from '@angular/material/paginator';
import {AlertService} from '@full-fledged/alerts';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.scss']
})
export class ProductHomeComponent implements OnInit {
  dataSource: ProductServerResponse;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;

  productsObserver = {
    next: () => {
      setTimeout(() => {
        this.spinner.hide();
      }, 700);
    },
    error: (error) => {
      this.alertService.danger(error.error.message);
      this.spinner.hide();
    }
  };

  constructor(
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }
  // Spinner method
  showSpinner(): void {
    this.spinner.show(undefined,
      {
        type: 'line-scale-party',
        size: 'medium',
        color: 'white',
        fullScreen: true
      }
    );
  }
  // Load products
  loadProducts(): void {
    this.showSpinner();
    this.productService.getProducts('createdAt:desc', 1, 10).pipe(
      map(productsData => this.dataSource = productsData)
    ).subscribe(this.productsObserver);
  }
  // Paginate change
  onPaginateChange(event: PageEvent): void {
    this.showSpinner();
    const defaultSort = 'createdAt:desc';
    let page = event.pageIndex;
    const limit = event.pageSize;
    page = page + 1;
    this.productService.getProducts(defaultSort, page, limit).pipe(
      map(productsData => this.dataSource = productsData)
    ).subscribe(this.productsObserver);
  }

}
