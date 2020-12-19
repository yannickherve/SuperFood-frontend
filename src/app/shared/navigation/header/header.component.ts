import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../../modules/auth/services/auth.service';
import {Router} from '@angular/router';
import {Role} from '../../../modules/auth/models/role';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(
    private authService: AuthService,
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  get isAuthorized(): boolean {
    return this.authService.isAuthenticated();
  }

  get isModerator(): boolean {
    return this.authService.hasRole(Role.moderator);
  }
  get isUser(): boolean {
    return this.authService.hasRole(Role.user);
  }
  get isAdmin(): boolean {
    return this.authService.hasRole(Role.admin);
  }

  onToggleSidenav(): void {
    this.sidenavToggle.emit();
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
