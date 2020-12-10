import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {User} from '../models/user';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_URL = environment.baseUrl;
  headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.headers.append('Content-Type', 'application/json');
  }

  login(user: User): Observable<any> {
    return this.http.post(this.API_URL + '/users/login', user);
  }

  register(user: User): Observable<any>{
    return this.http.post(this.API_URL + '/users/signup', user);
  }

  getToken(): string {
    return localStorage.getItem('access_token');
  }

  logout(): Observable<any> {
    return this.http.get(this.API_URL + '/users/logout');
  }

  // User admin-profile
  getUserProfile(): Observable<User> {
    return this.http.get(this.API_URL + '/users/me').pipe(
      map((user: User) => {
        return user;
      }),
      catchError(this.handleError)
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
