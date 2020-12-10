import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {User} from '../models/user';
import {Router} from '@angular/router';
import {AlertService} from '@full-fledged/alerts';
import {NgxSpinnerService} from 'ngx-spinner';

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
              private alertService: AlertService,
              private spinner: NgxSpinnerService
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
    this.showSpinner();
    this.alertService.info('Connexion en cours...');
    const observer = {
      next: (user) => {
        this.user = user;
        setTimeout(() => {
          this.spinner.hide();
          this.alertService.success(
            'Bon retour ' + this.user.name + ' !'
          );
          this.route.navigate(['/home']).then(() => {});
        }, 700);
      },
      error: (error) => {
        this.alertService.danger(error.error.message);
        this.spinner.hide();
      }
    };
    this.authService.login(this.loginForm.value).subscribe(observer);
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
