import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  API_URL = environment.baseUrl;
  headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.headers.append('Content-Type', 'application/json');
  }

  uploadProfileImage(formData: FormData): Observable<any> {
    return this.http.post<FormData>(this.API_URL + '/users/me/avatar', formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

}
