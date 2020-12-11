import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {User} from '../models/user';
import {Router} from '@angular/router';
import {AlertService} from '@full-fledged/alerts';
import {NgxSpinnerService} from 'ngx-spinner';

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
  panelOpenState = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private route: Router,
    private alertService: AlertService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }

  registerUser(): void {
    this.showSpinner();
    this.alertService.info('Inscription en cours...');
    const observer = {
      next: (user) => {
        this.user = user;
        setTimeout(() => {
          this.spinner.hide();
          this.alertService.success(
            'Inscription terminée'
          );
          this.route.navigate(['/auth/login']).then(() => {});
        }, 700);
      },
      error: (error) => {
        this.alertService.danger(error.error.message);
        this.spinner.hide();
      }
    };
    this.authService.register(this.signupForm.value).subscribe(observer);
  }

  showSpinner(): void {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        color: 'white',
        fullScreen: true
      }
    );
  }

}
