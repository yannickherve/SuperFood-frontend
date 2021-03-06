import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {BehaviorSubject, Observable, of, Subject, throwError} from 'rxjs';
import {Cart, CartServerResponse} from '../models/cart.model';
import {catchError, map, retry, switchMap, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private API_URL = environment.baseUrl;
  headers: HttpHeaders = new HttpHeaders();

  // new subject
  cartSource = new BehaviorSubject<CartServerResponse>({
    carts: [], currentPage: null, numOfCarts: null, pages: null, perPage: null
  });
  cart = this.cartSource.asObservable();

  constructor(private http: HttpClient) {
    this.headers.append('Content-Type', 'application/json');
  }

  getCart(sortBy?: string, page?: number, limit?: number): Observable<CartServerResponse> {
    // Define params for url pagination
    const options = {
      params: new HttpParams()
        .set('sortBy', sortBy)
        .set('page', String(page))
        .set('limit', String(limit))
    };
    return this.http.get<CartServerResponse>(this.API_URL + '/cart', options).pipe(
      retry(3), catchError(this.handleError),
      map( (cartData: CartServerResponse) => {
        this.cartSource.next(cartData);
        return cartData;
      }), catchError(err => {
        return throwError(err);
      })
    );
  }

  addToCart(product: { product: string }): Observable<any> {
    return this.http.post<Cart>(this.API_URL + '/cart', product);
  }

  updateCart(id: string, quantity: number): Observable<Cart> {
    return this.http.patch<Cart>(this.API_URL + '/cart/' + id, {quantity});
  }

  removeFromCart(cartId: string): Observable<any> {
    return  this.http.delete(this.API_URL + '/cart/' + cartId);
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
