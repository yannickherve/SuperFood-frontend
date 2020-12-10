import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product, ServerResponse} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private API_URL = environment.baseUrl;
  headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.headers.append('Content-Type', 'application/json');
  }

  getProducts(): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(this.API_URL + '/products');
  }

  getProduct(productId: string): Observable<Product> {
    // @ts-ignore
    return this.http.get<ServerResponse>(this.API_URL + '/products/' + productId);
  }

}
