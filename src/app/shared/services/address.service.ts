import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Address} from '../models/address';
import {catchError, map, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private API_URL = environment.baseUrl;
  headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.headers.append('Content-Type', 'application/json');
  }

  getAddress(): Observable<Address> {
    return this.http.get(this.API_URL + '/addresses').pipe(
      retry(3), catchError(this.handleError),
      map((addresses: Address) => {
        return addresses;
      }), catchError(err => {
        return throwError(err);
      })
    );
  }

  handleError(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}
