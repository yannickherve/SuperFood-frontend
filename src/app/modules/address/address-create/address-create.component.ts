import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AlertService} from '@full-fledged/alerts';
import {NgxSpinnerService} from 'ngx-spinner';
import {AddressService} from '../services/address.service';
import {Subscription} from 'rxjs';
import {Role} from '../../auth/models/role';
import {AuthService} from '../../auth/services/auth.service';

@Component({
  selector: 'app-address-create',
  templateUrl: './address-create.component.html',
  styleUrls: ['./address-create.component.scss']
})
export class AddressCreateComponent implements OnInit, OnDestroy {
  checked = false;
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
  createAddressSubs: Subscription;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private addressService: AddressService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  createAddress(): void {
    this.spinner.show();
    const addressObserver = {
      next: data => {
        setTimeout(() => {
          this.spinner.hide();
          this.alertService.success(
            'Adresse créée'
          );
          this.route.navigate(['/users/addresses']).then(() => {});
        }, 600);
      },
      error: (error) => {
        this.alertService.danger(error.error.message);
        this.spinner.hide();
      }
    };
    this.createAddressSubs = this.addressService.createUserAddress(this.addressForm.value).subscribe(addressObserver);
  }

  get isModerator(): boolean {
    return this.authService.hasRole(Role.moderator);
  }

  ngOnDestroy(): void {
    if (this.createAddressSubs) {
      this.createAddressSubs.unsubscribe();
    }
  }
}
