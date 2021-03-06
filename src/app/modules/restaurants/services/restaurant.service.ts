import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Restaurant, RestaurantServerResponse} from '../models/restaurant';
import {environment} from '../../../../environments/environment';
import {catchError, map, retry} from 'rxjs/operators';
import {Address} from '../../address/models/address';
import {Product, ProductServerResponse} from '../../products/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private API_URL = environment.baseUrl;
  headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.headers.append('Content-Type', 'application/json');
  }

  getRestaurants(sortBy?: string, page?: number, limit?: number, name?: string): Observable<RestaurantServerResponse> {
    const options = {
      params: new HttpParams()
        .set('sortBy', sortBy)
        .set('page', String(page))
        .set('limit', String(limit))
    };
    return this.http.get<RestaurantServerResponse>(this.API_URL + '/restaurants', options).pipe(
      retry(2), catchError(this.handleError),
      map((restaurantData: RestaurantServerResponse) => {
        return restaurantData;
      }), catchError(err => {
        return throwError(err);
      })
    );
  }

  getRestaurant(restaurantId: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(this.API_URL + '/restaurants/' + restaurantId).pipe(
      retry(3), catchError(this.handleError),
      map((restaurant: Restaurant) => {
        return restaurant;
      }), catchError(err => {
        return throwError(err);
      })
    );
  }

  paginateByName(sortBy: string, page: number, limit: number, name: string): Observable<RestaurantServerResponse> {
    const options = {
      params: new HttpParams()
        .set('sortBy', sortBy)
        .set('page', String(page))
        .set('limit', String(limit))
        .set('name', String(name))
    };
    return this.http.get<RestaurantServerResponse>(this.API_URL + '/restaurants', options).pipe(
      retry(3), catchError(this.handleError),
      map((restaurantData: RestaurantServerResponse) => {
        return restaurantData;
      }), catchError(err => {
        return throwError(err);
      })
    );
  }

  getProductsByRestaurant(restaurantId: string, sortBy?: string, page?: number, limit?: number): Observable<ProductServerResponse> {
    const options = {
      params: new HttpParams()
        .set('sortBy', sortBy)
        .set('page', String(page))
        .set('limit', String(limit))
    };
    return this.http.get<ProductServerResponse>(this.API_URL + '/products/restaurant/' + restaurantId, options).pipe(
      retry(3), catchError(this.handleError),
      map((products: ProductServerResponse) => {
        return products;
      }), catchError(err => {
        return throwError(err);
      })
    );
  }

  createRestaurant(formData: FormData): Observable<any> {
    return this.http.post<FormData>(this.API_URL + '/restaurants', formData);
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
