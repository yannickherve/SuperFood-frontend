import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/services/auth.service';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  currentUser: any = {};
  profileForm = this.fb.group({
    name: [null],
    email: [null],
    password: [null],
    age: [null, Validators.compose([
      Validators.minLength(0), Validators.maxLength(3)])
    ],
    phone: null,
    address: [null],
    avatar: null,
    newsletter: null
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getUserData();
  }
  getUserData(): void {
    const userObserver = {
      next: data => {
        this.currentUser = data;
      },
      error: error => {
        // console.log(error);
      }
    };
    this.authService.getCurrentUser().subscribe(userObserver);
  }

  updateUser(): void {
      //
  }

}
