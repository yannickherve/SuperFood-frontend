import {Component, OnDestroy, OnInit} from '@angular/core';
import {AddressService} from '../services/address.service';
import {AddressServerResponse} from '../models/address';
import {AlertService} from '@full-fledged/alerts';
import {Subscription} from 'rxjs';
import {PageEvent} from '@angular/material/paginator';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-address-view',
  templateUrl: './address-view.component.html',
  styleUrls: ['./address-view.component.scss']
})
export class AddressViewComponent implements OnInit, OnDestroy {
  addresses: AddressServerResponse;
  addressesSubs: Subscription;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
  addressObserver = {
    next: address => {
      console.log(this.addresses);
    },
    error: error => {
      this.alertService.danger(error);
    }
  };

  constructor(
    private addressService: AddressService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getUserAddress();
  }

  getUserAddress(): void {
    this.addressesSubs = this.addressService.getAddress('createdAt:desc', 1, 10).pipe(
      map(addressData => this.addresses = addressData)
    ).subscribe(this.addressObserver);
  }

  ngOnDestroy(): void {
    if (this.addressesSubs){
      this.addressesSubs.unsubscribe();
    }
  }

}
