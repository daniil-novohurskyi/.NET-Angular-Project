import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface ErrorInfo {
  hasError: boolean;
  errorCode?: string;
  errorMessage?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  private errorSubject = new BehaviorSubject<ErrorInfo>({ hasError: false });
  error$ = this.errorSubject.asObservable();

  setError(errorCode: string, errorMessage?: string): void {
    this.errorSubject.next({
      hasError: true,
      errorCode,
      errorMessage,
    });
  }

  clearError(): void {
    this.errorSubject.next({ hasError: false });
  }

  getCurrentError(): ErrorInfo {
    return this.errorSubject.getValue();
  }
}
