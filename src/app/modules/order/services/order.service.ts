import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Order} from '../models/order';
import {catchError, map} from 'rxjs/operators';

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

}
