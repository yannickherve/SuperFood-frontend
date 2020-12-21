import { Component, OnInit } from '@angular/core';
import {AddressService} from '../../../shared/services/address.service';
import {Address} from '../../../shared/models/address';
import {FormBuilder, Validators} from '@angular/forms';
import {OrderService} from '../services/order.service';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.scss']
})
export class OrderCreateComponent implements OnInit {
  addresses: Address[];
  paymentValue: string[] = ['card', 'mandate', 'transfer', 'check'];
  paymentTemporary: string;
  orderForm = this.fb.group({
    address: [null, Validators.required],
    amount: [100, Validators.required],
    payment: ['card', Validators.required],
    agree: [null, Validators.required]
  });

  constructor(
    private addressService: AddressService,
    private orderService: OrderService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getUserAddress();
  }

  getUserAddress(): void {
    const addressObserver = {
      next: address => {
        this.addresses = address.addresses;
      },
      error: error => {
        console.log(error);
      }
    };
    this.addressService.getAddress().subscribe(addressObserver);
  }

  createOrder(): void {
    const orderObserver = {
      next: order => {
        console.log(order);
      },
      error: error => {
        console.log(error);
      }
    };
    console.log(this.orderForm.value);
    this.orderService.createOrder(this.orderForm.value).subscribe(orderObserver);
  }
}
