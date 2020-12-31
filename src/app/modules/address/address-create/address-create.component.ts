import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-address-create',
  templateUrl: './address-create.component.html',
  styleUrls: ['./address-create.component.scss']
})
export class AddressCreateComponent implements OnInit {
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

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  createAddress(): void {
    console.log(this.addressForm.value);
  }
}
