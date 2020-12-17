import {Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {AuthService} from '../../auth/services/auth.service';

@Component({
  selector: 'app-dashboard-navigation',
  templateUrl: './dashboard-navigation.component.html',
  styleUrls: ['./dashboard-navigation.component.scss']
})
export class DashboardNavigationComponent implements OnInit{
  currentUser: any = {};
  avatar: any;
  avatarLink: any;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getUserData();
     // this.getAvatar();
  }
  getUserData(): void {
    const userObserver = {
      next: data => {
        this.currentUser = data;
        this.avatarLink = 'http://localhost:4000/users/' + data._id + '/avatar';
        console.log(this.avatarLink);
      },
      error: error => {
        console.log(error);
      }
    };
    this.authService.getUserProfile().subscribe(userObserver);
  }
  getAvatar(): void {
    const avatarObserver = {
      next: avatar => {
        // this.avatar = avatar;
      },
      // error: error => console.log(error)
    };
    this.authService.getUserAvatar('5fc821498510905c2848e7ba').subscribe(avatarObserver);
  }


}
