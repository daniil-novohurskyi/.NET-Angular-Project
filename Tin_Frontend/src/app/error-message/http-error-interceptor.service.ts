import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';
import { Router } from '@angular/router';

@Injectable()
export class HttpErrorInterceptorService implements HttpInterceptor {
  error =false;
  constructor(private errorHandler: ErrorHandlerService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Произошла ошибка при выполнении запроса';
          if (error.status === 404) {
            errorMessage = 'Ресурс не найден';
          } else if (error.status === 500) {
            errorMessage = 'Ошибка на сервере';
          }
          // Устанавливаем ошибку
          this.errorHandler.setError(error.status.toString(), errorMessage);
          // Перенаправление на страницу ошибки
          this.router.navigate(['/error']);
        return throwError(() => new Error(errorMessage));
      })
    );
  }

}
