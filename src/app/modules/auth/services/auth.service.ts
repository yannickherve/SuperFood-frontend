import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable, of, throwError} from 'rxjs';
import {User} from '../models/user';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Role} from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_URL = environment.baseUrl;
  headers: HttpHeaders = new HttpHeaders();
  // isAuthenticated = new ReplaySubject(1);
  private user: User;

  constructor(
      private http: HttpClient,
      private jwtHelper: JwtHelperService
  ) {
    this.headers.append('Content-Type', 'application/json');
  }

  login(user: User): Observable<any> {
    return this.http.post(this.API_URL + '/users/login', user).pipe(
      map((data: {token: string, user: any}) => {
        localStorage.setItem('access_token', data.token);
        this.user = data.user;
        return data.user;
      }), catchError(err => {
        return throwError(err);
      })
    );
  }

  register(user: User): Observable<any>{
    return this.http.post(this.API_URL + '/users/signup', user).pipe(
      map((data: { token: string, user: any }) => {
        return data.user;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  getToken(): string {
    return localStorage.getItem('access_token');
  }

  removeToken(): void {
    localStorage.removeItem('access_token');
  }

  logout(): Observable<any> {
    return this.http.get(this.API_URL + '/users/logout').pipe(
      map(res => {
        console.log('logout');
        this.user = null;
      })
    );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    if (token == null){
      return false;
    } else {
      return !this.jwtHelper.isTokenExpired(token);
    }
  }

  hasRole(role: Role): any {
    const token = localStorage.getItem('access_token');
    const tokenPayload = this.jwtHelper.decodeToken(token);
    return this.isAuthenticated() && tokenPayload.role === role;
  }

  /**
   * get current user from server
   */
  getCurrentUser(): Observable<User> {
    return this.http.get(this.API_URL + '/users/me').pipe(
      map((user: User) => {
        // this.isAuthenticated.next(true);
        return user;
      }),
      catchError(err => {
        // this.isAuthenticated.next(false);
        return throwError(err);
      })
    );
  }

  getUserAvatar(id: string): Observable<any>  {
    return this.http.get(this.API_URL + '/users/' + id + '/avatar', {responseType: 'arraybuffer'}).pipe(
      map(res => {
        const blob = new Blob([res], {type: 'image/png'});
        return (window.URL || window.webkitURL).createObjectURL(blob);
      })
    );
  }

  // Error
  handleError(error: HttpErrorResponse): Observable<any> {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }

}
