import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../../modules/auth/services/auth.service';
import {Router} from '@angular/router';

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

  onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }

  onLogout(): void {
    const authObserver = {
      next: res => {
        console.log(res);
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');

        setTimeout(() => {
          this.route.navigate(['/home']);
        }, 2000);
      },
      error: err => {
        // console.log(err);
      }
    };
    this.authService.logout().subscribe(authObserver);
  }

}
