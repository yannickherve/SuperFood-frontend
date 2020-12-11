import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Product, ProductServerResponse} from '../models/product.model';
import {catchError, map, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private API_URL = environment.baseUrl;
  headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.headers.append('Content-Type', 'application/json');
  }

  getProducts(sortBy: string, page: number, limit: number): Observable<ProductServerResponse> {
    const options = {
      params: new HttpParams()
        .set('sortBy', sortBy)
        .set('page', String(page))
        .set('limit', String(limit))
    };
    return this.http.get<ProductServerResponse>(this.API_URL + '/products', options).pipe(
      retry(3), catchError(this.handleError),
      map((productsData: ProductServerResponse) => {
        return productsData;
      })
    );
  }

  getProduct(productId: string): Observable<Product> {
    // @ts-ignore
    return this.http.get<ServerResponse>(this.API_URL + '/products/' + productId);
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
