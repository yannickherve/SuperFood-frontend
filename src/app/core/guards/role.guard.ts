import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthService} from '../../modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private jwtHelper: JwtHelperService,
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('access_token');
    const tokenPayload = this.jwtHelper.decodeToken(token);
    if (!this.authService.isAuthenticated() || tokenPayload.role !== expectedRole) {
      this.router.navigate(['/auth/login']).then(() => {});
      return false;
    }
    return true;
  }

}
