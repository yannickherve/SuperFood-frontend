import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {User} from '../models/user';
import {Router} from '@angular/router';
import {AlertService} from '@full-fledged/alerts';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: User;

  constructor(private authService: AuthService,
              private route: Router,
              private alertService: AlertService
              ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', { validators: [Validators.required] })
    });
  }

  onSubmit(): void {
    const observer = {
      next: (user) => {
        this.user = user;
        setTimeout(() => {
          this.route.navigate(['/home']).then(() => {});
        }, 1000);
      },
      error: (error) => {
        this.alertService.danger(error.error.message);
      }
    };
    this.authService.login(this.loginForm.value).subscribe(observer);
  }
}
