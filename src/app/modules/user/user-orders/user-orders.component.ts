import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderServerResponse} from '../../order/models/order';
import {Subscription} from 'rxjs';
import {PageEvent} from '@angular/material/paginator';
import {OrderService} from '../../order/services/order.service';
import {map} from 'rxjs/operators';
import {NgxSpinnerService} from 'ngx-spinner';
import {AlertService} from '@full-fledged/alerts';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit, OnDestroy {
  dataSource: OrderServerResponse;
  dataSourceSubs: Subscription;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  displayedColumns: string[] = ['reference', 'createdAt', 'amount', 'payment', 'status', 'address'];
  pageEvent: PageEvent;
  orderObserver = {
    next: order => {
      console.log(order);
      this.spinner.hide();
    },
    error: err => {
      this.alertService.danger(err);
      this.spinner.hide();
    }
  };

  constructor(
    private orderService: OrderService,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.loadOrder();
  }

  loadOrder(): void {
    this.showSpinner();
    this.dataSourceSubs = this.orderService.readOrders('createdAt:desc', 1, 5).pipe(
      map((orderData: OrderServerResponse) => this.dataSource = orderData)
    ).subscribe(this.orderObserver);
  }

  onPaginateChange(event: PageEvent): void {
    this.showSpinner();
    const defaultSort = 'createdAt:desc';
    let page = event.pageIndex;
    const limit = event.pageSize;
    page = page + 1;
    this.dataSourceSubs = this.orderService.readOrders(defaultSort, page, limit).pipe(
      map((orderData: OrderServerResponse) => this.dataSource = orderData)
    ).subscribe(this.orderObserver);
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

  ngOnDestroy(): void {
    if (this.dataSourceSubs) {
      this.dataSourceSubs.unsubscribe();
    }
  }

}
