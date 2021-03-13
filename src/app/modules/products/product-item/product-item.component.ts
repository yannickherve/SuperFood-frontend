import {Component, Input, OnInit} from '@angular/core';
import {ProductServerResponse} from '../models/product.model';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() dataSource: ProductServerResponse;

  constructor() { }

  ngOnInit(): void {
  }

}
