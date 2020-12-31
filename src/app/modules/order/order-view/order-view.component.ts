import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from '../services/order.service';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss']
})
export class OrderViewComponent implements OnInit {

  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
  }


}
