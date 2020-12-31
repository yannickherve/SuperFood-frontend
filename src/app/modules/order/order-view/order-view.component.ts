import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from '../services/order.service';
import {map} from 'rxjs/operators';
import {OrderServerResponse} from '../models/order';
import {Subscription} from 'rxjs';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss']
})
export class OrderViewComponent implements OnInit, OnDestroy {
  dataSource: OrderServerResponse;
  dataSourceSubs: Subscription;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  displayedColumns: string[] = ['reference', 'createdAt', 'amount', 'payment', 'status', 'actions'];
  pageEvent: PageEvent;
  orderObserver = {
    next: order => {
      console.log(order);
    },
    error: err => {
      console.log(err);
    }
  };

  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.loadOrder();
  }

  loadOrder(): void {
    this.dataSourceSubs = this.orderService.readOrders('createdAt:desc', 1, 5).pipe(
      map((orderData: OrderServerResponse) => this.dataSource = orderData)
    ).subscribe(this.orderObserver);
  }

  onPaginateChange(event: PageEvent): void {
    const defaultSort = 'createdAt:desc';
    let page = event.pageIndex;
    const limit = event.pageSize;
    page = page + 1;
    this.dataSourceSubs = this.orderService.readOrders(defaultSort, page, limit).pipe(
      map((orderData: OrderServerResponse) => this.dataSource = orderData)
    ).subscribe(this.orderObserver);
  }

  ngOnDestroy(): void {
    if (this.dataSourceSubs) {
      this.dataSourceSubs.unsubscribe();
    }
  }

}
