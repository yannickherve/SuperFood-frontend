import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CartServerResponse} from '../models/cart.model';
import {CartService} from '../services/cart.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {AlertService} from '@full-fledged/alerts';
import {NgxSpinnerService} from 'ngx-spinner';
import {Subject} from 'rxjs';
import {map, takeUntil, tap} from 'rxjs/operators';

@Component({
  selector: 'app-cart-home',
  templateUrl: './cart-home.component.html',
  styleUrls: ['./cart-home.component.scss']
})
export class CartHomeComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['image', 'name', 'price', 'quantity', '_id'];
  dataSource: CartServerResponse;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  destroy$ = new Subject<boolean>();

  constructor(
    private cartService: CartService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.initDataSource();
  }

  initDataSource(): void {
    this.cartService.getCart('createdAt:desc', 1, 5).pipe(
      tap(carts => console.log(carts)),
      map( (cartData: CartServerResponse) => this.dataSource = cartData)
    ).subscribe();
  }

  ngAfterViewInit(): void {
    //
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
      next: response => {
        setTimeout(() => this.spinner.hide(), 500);
        setTimeout(() => this.alertService.success('Produit supprimé'), 1000);
      }
    };
    this.cartService.removeFromCart(id).pipe().pipe(takeUntil(this.destroy$)).subscribe(removeObserver);
    this.initDataSource();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

  onPaginateChange(event: PageEvent): void {
    const defaultSort = 'createdAt:desc';
    let page = event.pageIndex;
    const limit = event.pageSize;
    page = page + 1;
    console.log(page, limit);
    this.cartService.getCart(defaultSort, page, limit).pipe(
      map((cartData: CartServerResponse) => this.dataSource = cartData)
    ).subscribe();
  }
}
