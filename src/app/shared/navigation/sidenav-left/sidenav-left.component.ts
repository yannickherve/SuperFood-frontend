import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../../modules/auth/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidenav-left',
  templateUrl: './sidenav-left.component.html',
  styleUrls: ['./sidenav-left.component.scss']
})
export class SidenavLeftComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();

  constructor(
    private authService: AuthService,
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  onClose(): void {
    this.closeSidenav.emit();
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

  get isAuthorized(): boolean {
    return this.authService.isAuthenticated();
  }



}
