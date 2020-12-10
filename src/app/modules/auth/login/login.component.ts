import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {User} from '../models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: User;

  constructor(private authService: AuthService,
              private route: Router
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
      next: (data) => {
        this.user = data.user;
        const token = data.token;
        localStorage.setItem('access_token', token);
        const userData = {
          name: data.user.name,
          age: data.user.age,
          last_seen: data.user.last_seen,
          email: data.user.email,
          role: data.user.role
        };
        localStorage.setItem('user', JSON.stringify(userData));
        setTimeout(() => {
          this.route.navigate(['/home']);
        }, 1000);
      },
      error: (error) => {
        // console.log(error);
      }
    };
    this.authService.login(this.loginForm.value).subscribe(observer);
  }
}
