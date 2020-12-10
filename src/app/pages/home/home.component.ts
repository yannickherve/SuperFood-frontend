import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../modules/auth/services/auth.service';
import {Router} from '@angular/router';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router
              ) {
  }
  @ViewChild('sidenav') sidenav: MatSidenav;

  reason = '';

  url = 'assets/img/foodiesfeed.com_tacos-with-pulled-pork-fresh-vegetables-and-cream.jpg';

  close(reason: string): void {
    this.reason = reason;
    this.sidenav.close().then(r => {});
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      const removeToken = localStorage.removeItem('access_token');
      const removeUser = localStorage.removeItem('user');
      if (removeToken == null) {
        this.router.navigate(['/auth/login']);
      }
    });
  }

}
