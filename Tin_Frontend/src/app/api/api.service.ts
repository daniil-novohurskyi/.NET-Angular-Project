import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl : string = "http://localhost:5222";

  constructor(private http: HttpClient) {}

  // Метод для выполнения POST-запросов с FormData
  postFormData<T>(endpoint: string, formData: FormData): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, formData);
  }

  // Метод для выполнения PUT-запросов с FormData
  putFormData<T>(endpoint: string, formData: FormData): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, formData);
  }

  // Остальные методы для GET, POST, DELETE и PUT остаются
  get<T>(endpoint: string, params?: any): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { params });
  }

  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body);
  }

  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, body);
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`);
  }
}
