import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {AlertService} from '@full-fledged/alerts';
import {NgxSpinnerService} from 'ngx-spinner';
import {AddressService} from '../../address/services/address.service';
import {map} from 'rxjs/operators';
import {AddressServerResponse} from '../../address/models/address';
import {File} from '../../../shared/models/file';
import {RestaurantService} from '../services/restaurant.service';

@Component({
  selector: 'app-restaurant-add',
  templateUrl: './restaurant-add.component.html',
  styleUrls: ['./restaurant-add.component.scss']
})
export class RestaurantAddComponent implements OnInit {
  restaurantForm = this.fb.group({
    name: [null, Validators.compose([
      Validators.minLength(3)])
    ],
    description: [null, Validators.required],
    email: [null, Validators.required],
    address: [null, Validators.required],
    image: [null, Validators.required],
  });

  imagePreview: string;
  checked = false;
  createRestaurantSubs: Subscription;
  addressesSubs: Subscription;
  addresses: AddressServerResponse;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private addressService: AddressService,
    private restaurantService: RestaurantService
  ) { }

  ngOnInit(): void {
    this.getUserAddresses();
  }

  // Create restaurant by key value formData
  createRestaurant(): void  {
    this.showSpinner();
    const formData = new FormData();
    formData.append('name', this.restaurantForm.value.name);
    formData.append('description', this.restaurantForm.value.description);
    formData.append('email', this.restaurantForm.value.email);
    formData.append('address', this.restaurantForm.value.address);
    formData.append('image', this.restaurantForm.value.image);

    const observer = {
      next: data => {
        this.spinner.hide();
        this.alertService.success('Restaurant créée avec succès');
      },
      error: error => {
        this.spinner.hide();
        this.alertService.danger(error);
      }
    };
    this.restaurantService.createRestaurant(formData).subscribe(observer);
  }

  onSelect(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];
    this.restaurantForm.patchValue({image: file});
    this.restaurantForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result.toString();
    };
    reader.readAsDataURL(file);
  }

  getUserAddresses(): void {
    const addressObserver = {
      next: address => {
        this.alertService.info('Liste des adresses OK!');
      },
      error: error => {
        this.alertService.danger('Erreur lors de la réccupération des adresses \n impossible de continuer');
      }
    };
    this.addressesSubs = this.addressService.getAddresses('createdAt:desc', 1, 5).pipe(
      map(addressData => this.addresses = addressData)
    ).subscribe(addressObserver);
  }

  showSpinner(): void {
    this.spinner.show(undefined,
      {
        type: 'line-scale-party',
        size: 'medium',
        color: 'white',
        fullScreen: true
      }
    );
  }
}
