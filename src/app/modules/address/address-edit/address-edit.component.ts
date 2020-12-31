import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '@full-fledged/alerts';
import {NgxSpinnerService} from 'ngx-spinner';
import {AddressService} from '../services/address.service';
import {Address, AddressServerResponse} from '../models/address';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-address-edit',
  templateUrl: './address-edit.component.html',
  styleUrls: ['./address-edit.component.scss']
})
export class AddressEditComponent implements OnInit, OnDestroy {
  address: Address;
  addresses: AddressServerResponse;
  addressForm = this.fb.group({
    professional: [false, Validators.required],
    full_name: [null, Validators.required],
    civility: [null, Validators.required],
    address1: [null, Validators.required],
    address2: null,
    company: null,
    city: [null, Validators.required],
    postcode: [null, Validators.compose([
      Validators.minLength(5)])
    ],
    phone: [null, Validators.required],
    country: [null, Validators.required]
  });
  updateAddressSubs: Subscription;
  getAddressSubs: Subscription;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private addressService: AddressService
  ) { }

  ngOnInit(): void {
    this.getUserAddress();
  }

  getUserAddress(): void {
    this.spinner.show();
    const updateAddressObserver = {
      next: address => {
        this.patchAddressValues(address);
        this.spinner.hide();
      },
      error: error => {
        this.alertService.danger(error);
      }
    };
    this.getAddressSubs = this.addressService.getAddress(this.route.snapshot.paramMap.get('id')).pipe(
      map(addressData => this.address = addressData)
    ).subscribe(updateAddressObserver);
  }

  patchAddressValues(address: Address): void {
    this.addressForm.patchValue({
      professional: address.professional,
      full_name: address.full_name,
      civility: address.civility,
      address1: address.address1,
      address2: address.address2,
      company: address.company,
      city: address.city,
      postcode: address.postcode,
      phone: address.phone,
      country: address.country,
    });
  }

  updateAddress(): void {
    this.spinner.show();
    const observer = {
      next: data => {
        console.log(data);
        this.spinner.hide();
        this.router.navigate(['/users/addresses']).then(() => {});
        this.alertService.success(data.message);
      },
      error: err => {
        this.alertService.danger(err);
      }
    };
    this.updateAddressSubs = this.addressService.updateAddress(this.route.snapshot.paramMap.get('id'), this.addressForm.value)
      .subscribe(observer);
  }

  ngOnDestroy(): void {
    if (this.getAddressSubs) {
      this.getAddressSubs.unsubscribe();
    }
    if (this.updateAddressSubs) {
      this.updateAddressSubs.unsubscribe();
    }
  }
}
