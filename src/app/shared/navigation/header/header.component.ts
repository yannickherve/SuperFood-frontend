import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../../modules/auth/services/auth.service';
import {Router} from '@angular/router';
import {Role} from '../../../modules/auth/models/role';
import {CartService} from '../../../modules/cart/services/cart.service';
import {Observable} from 'rxjs';
import {Cart, CartServerResponse} from '../../../modules/cart/models/cart.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  cartServer$: Observable<CartServerResponse>;
  cart: CartServerResponse;
  cartChanged: Observable<CartServerResponse>;

  constructor(
    private authService: AuthService,
    private route: Router,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.cartService.getCart().subscribe();
      this.cartServer$ = this.cartService.cart;
    } else {
      return;
    }
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
