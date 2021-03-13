import {Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {AuthService} from '../../auth/services/auth.service';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-dashboard-navigation',
  templateUrl: './dashboard-navigation.component.html',
  styleUrls: ['./dashboard-navigation.component.scss']
})
export class DashboardNavigationComponent implements OnInit{
  currentUser: any = {};
  avatar: any;
  avatarLink: string;
  avatarLinkEnv = environment.avatarLink;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.getUserData();
  }
  getUserData(): void {
    const userObserver = {
      next: data => {
        this.currentUser = data;
        this.avatarLink = this.avatarLinkEnv + data._id + '/avatar';
      },
      error: error => {
        // console.log(error);
      }
    };
    this.authService.getCurrentUser().subscribe(userObserver);
  }

  get isAuthorized(): boolean {
    return this.authService.isAuthenticated();
  }
  onLogout(): void {
    const authObserver = {
      next: res => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');

        setTimeout(() => {
          this.route.navigate(['/home']).then(() => {});
        }, 800);
      },
      error: err => {
        // console.log(err);
      }
    };
    this.authService.logout().subscribe(authObserver);
  }

}
