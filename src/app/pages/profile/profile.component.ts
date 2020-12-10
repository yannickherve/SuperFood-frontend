import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../modules/auth/services/auth.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const observer = {
      next: (data) => {
        this.currentUser = data;
      },
      error: (error) => {
        // console.log(error);
      }
    };
    this.authService.getUserProfile().subscribe(observer);
  }

}
