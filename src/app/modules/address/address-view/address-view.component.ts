import {Component, OnDestroy, OnInit} from '@angular/core';
import {AddressService} from '../services/address.service';
import {AddressServerResponse} from '../models/address';
import {AlertService} from '@full-fledged/alerts';
import {Subscription} from 'rxjs';
import {PageEvent} from '@angular/material/paginator';
import {map} from 'rxjs/operators';
import {NgxSpinnerService} from 'ngx-spinner';

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
      this.spinner.hide();
    },
    error: error => {
      this.alertService.danger(error);
    }
  };

  constructor(
    private addressService: AddressService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.getUserAddress();
  }

  getUserAddress(): void {
    this.showSpinner();
    this.addressesSubs = this.addressService.getAddress('createdAt:desc', 1, 5).pipe(
      map(addressData => this.addresses = addressData)
    ).subscribe(this.addressObserver);
  }

  // Paginate change
  onPaginateChange(event: PageEvent): void {
    this.showSpinner();
    const defaultSort = 'createdAt:desc';
    let page = event.pageIndex;
    const limit = event.pageSize;
    page = page + 1;
    this.addressesSubs = this.addressService.getAddress(defaultSort, page, limit).pipe(
      map(addressData => this.addresses = addressData)
    ).subscribe(this.addressObserver);
  }

  // Spinner method
  showSpinner(): void {
    this.spinner.show(undefined,
      {
        type: 'ball-fall',
        size: 'medium',
        color: 'white',
        fullScreen: true
      }
    );
  }

  ngOnDestroy(): void {
    if (this.addressesSubs){
      this.addressesSubs.unsubscribe();
    }
  }

}
