import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {OrderServerResponse} from '../../order/models/order';
import {catchError, map, retry} from 'rxjs/operators';
import {Address, AddressServerResponse} from '../models/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private API_URL = environment.baseUrl;
  headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.headers.append('Content-Type', 'application/json');
  }

  /**
   * Read orders
   */
  getAddress(sortBy?: string, page?: number, limit?: number): Observable<AddressServerResponse> {
    const options = {
      params: new HttpParams()
        .set('sortBy', sortBy)
        .set('page', String(page))
        .set('limit', String(limit))
    };
    return this.http.get<AddressServerResponse>(this.API_URL + '/addresses', options).pipe(
      retry(3), catchError(this.handleError),
      map((addresses: AddressServerResponse) => {
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
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
