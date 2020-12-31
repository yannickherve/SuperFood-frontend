import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Order, OrderServerResponse} from '../models/order';
import {catchError, map, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private API_URL = environment.baseUrl;
  headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.headers.append('Content-Type', 'application/json');
  }

  /**
   * Create a order
   */
  createOrder(order: Order): Observable<Order> {
    return this.http.post(this.API_URL + '/orders', order).pipe(
      map((orderData: Order) => {
        return orderData;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  /**
   * Read orders
   */
  readOrders(sortBy?: string, page?: number, limit?: number): Observable<OrderServerResponse> {
    const options = {
      params: new HttpParams()
        .set('sortBy', sortBy)
        .set('page', String(page))
        .set('limit', String(limit))
    };
    return this.http.get(this.API_URL + '/orders', options).pipe(
      retry(3), catchError(this.handleError),
      map((orderData: OrderServerResponse) => {
        return orderData;
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
