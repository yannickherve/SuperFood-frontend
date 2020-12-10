import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {User} from '../models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm = this.fb.group({
    name: [null, Validators.required],
    email: [null, Validators.required],
    password: [null, Validators.required],
    age: [null, Validators.compose([
      Validators.minLength(0), Validators.maxLength(3)])
    ],
    role: ['0', Validators.required],
    phone: null,
    address: [null, Validators.required],
    avatar: null,
    newsletter: null
  });
  user: User;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  registerUser(): void {
    const observer = {
      next: (data) => {
        this.user = data.user;
        setTimeout(() => {
          this.route.navigate(['/home']);
        }, 5000);
      },
      error: (error) => {
        // console.log(error);
      }
    };
    this.authService.register(this.signupForm.value).subscribe(observer);
  }

}
