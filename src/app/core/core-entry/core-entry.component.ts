import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {AuthService} from '../../modules/auth/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-core-entry',
  templateUrl: './core-entry.component.html',
  styleUrls: ['./core-entry.component.scss']
})
export class CoreEntryComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;

  reason = '';

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }

  constructor(private authService: AuthService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      const removeToken = localStorage.removeItem('access_token');
      const removeUser = localStorage.removeItem('user');
      if (removeToken == null) {
        console.log('token is null');
        this.router.navigate(['/auth/login']);
      }
    });
  }
}
