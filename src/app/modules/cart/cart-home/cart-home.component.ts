import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartServerResponse} from '../models/cart.model';
import {CartService} from '../services/cart.service';
import {PageEvent} from '@angular/material/paginator';
import {AlertService} from '@full-fledged/alerts';
import {NgxSpinnerService} from 'ngx-spinner';
import {Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import {HelperCartService} from '../services/helper-cart.service';

@Component({
  selector: 'app-cart-home',
  templateUrl: './cart-home.component.html',
  styleUrls: ['./cart-home.component.scss']
})
export class CartHomeComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['image', 'name', 'price', 'quantity', '_id'];
  dataSource: CartServerResponse;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
  cartObserver = {
    next: (cart) => {
      setTimeout(() => {
        this.getTotalPrice();
        this.spinner.hide();
      }, 700);
    },
    error: (error) => {
      this.alertService.danger('Connectez vous svp');
      this.spinner.hide();
    }
  };
  destroy$ = new Subject<boolean>();

  constructor(
    private cartService: CartService,
    private helperCartService: HelperCartService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.initDataSource();
  }

  initDataSource(): void {
    this.showSpinner();
    this.cartService.getCart('createdAt:desc', 1, 5).pipe(
      map( (cartData: CartServerResponse) => this.dataSource = cartData)
    ).subscribe(this.cartObserver);
  }

  getTotalPrice(): number {
   return this.helperCartService.getTotalPrice(this.dataSource.carts);
  }

  removeItemCart(id: string): void {
    this.spinner.show(undefined,
      {
        type: 'line-scale-party',
        size: 'medium',
        color: 'white',
        fullScreen: false
      }
    );

    const removeObserver = {
      next: () => {
        setTimeout(() => {
          this.initDataSource();
          this.spinner.hide();
        }, 500);
        setTimeout(() => this.alertService.success('Produit supprimé'), 1000);
      }
    };
    this.cartService.removeFromCart(id).pipe().pipe(takeUntil(this.destroy$)).subscribe(removeObserver);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

  // Spinner method
  showSpinner(): void {
    this.spinner.show(undefined,
      {
        type: 'ball-spin-clockwise-fade-rotating',
        size: 'medium',
        color: 'white',
        fullScreen: true
      }
    );
  }

  onPaginateChange(event: PageEvent): void {
    this.showSpinner();
    const defaultSort = 'createdAt:desc';
    let page = event.pageIndex;
    const limit = event.pageSize;
    page = page + 1;
    this.cartService.getCart(defaultSort, page, limit).pipe(
      map((cartData: CartServerResponse) => this.dataSource = cartData)
    ).subscribe(this.cartObserver);
  }
}
