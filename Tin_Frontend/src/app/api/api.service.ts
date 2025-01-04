import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl: string = "http://localhost:5222";

  constructor(private http: HttpClient) {}

  // Метод для выполнения POST-запросов с FormData
  postFormData<T>(endpoint: string, formData: FormData, params?: any): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          httpParams = httpParams.set(key, params[key]);
        }
      }
    }
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, formData, { params: httpParams });
  }

  // Метод для выполнения PUT-запросов с FormData
  putFormData<T>(endpoint: string, formData: FormData, params?: any): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          httpParams = httpParams.set(key, params[key]);
        }
      }
    }
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, formData, { params: httpParams });
  }

  // Метод для выполнения GET-запросов с параметрами
  get<T>(endpoint: string, params?: any): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          httpParams = httpParams.set(key, params[key]);
        }
      }
    }
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { params: httpParams });
  }

  // Метод для выполнения POST-запросов с параметрами
  post<T>(endpoint: string, body: any, params?: any): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          httpParams = httpParams.set(key, params[key]);
        }
      }
    }
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body, { params: httpParams });
  }

  // Метод для выполнения PUT-запросов с параметрами
  put<T>(endpoint: string, body: any, params?: any): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          httpParams = httpParams.set(key, params[key]);
        }
      }
    }
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, body, { params: httpParams });
  }

  // Метод для выполнения DELETE-запросов с параметрами
  delete<T>(endpoint: string, params?: any): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          httpParams = httpParams.set(key, params[key]);
        }
      }
    }
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, { params: httpParams });
  }
}
