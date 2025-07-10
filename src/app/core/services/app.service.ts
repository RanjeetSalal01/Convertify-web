import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  private createHeaders(token?: string): HttpHeaders {
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  getMethod(url: string, params?: any, token?: string): Observable<any> {
    const httpParams = new HttpParams({ fromObject: params || {} });
    const headers = this.createHeaders(token);
    return this.http.get(url, { params: httpParams, headers });
  }

  postMethod(url: string, body: any, token?: string): Observable<any> {
    const headers = this.createHeaders(token);
    return this.http.post(url, body, { headers });
  }
}
