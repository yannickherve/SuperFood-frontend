import {Injectable} from '@angular/core';
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
   * Read addresses
   */
  getAddresses(sortBy?: string, page?: number, limit?: number): Observable<AddressServerResponse> {
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

  /**
   * Create an address
   */
  createUserAddress(address: Address): Observable<Address> {
    return this.http.post<Address>(this.API_URL + '/addresses', address).pipe(
      map((addressData: Address) => {
        return addressData;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  /**
   * Update an address
   */
  updateAddress(id: string, address: Address): Observable<Address> {
    return this.http.patch<Address>(this.API_URL + '/addresses/' + id, address);
  }

  getAddress(addressId: string): Observable<Address> {
    return this.http.get<Address>(this.API_URL + '/addresses/' + addressId).pipe(
      retry(3), catchError(this.handleError),
      map((address: Address) => {
        return address;
      }), catchError(err => {
        return throwError(err);
      })
    );
  }

  /**
   * Delete address
   */
  deleteAddress(addressId: string): Observable<Address> {
    return this.http.delete<Address>(this.API_URL + '/addresses/' + addressId);
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
