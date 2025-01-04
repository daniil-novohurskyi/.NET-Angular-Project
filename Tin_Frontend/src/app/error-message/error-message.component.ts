import { Component, OnDestroy, OnInit } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css'],
  standalone: true,
  imports: [
    NgIf
  ]
})
export class ErrorMessageComponent implements OnInit, OnDestroy {
  errorCode: string | undefined = '';
  errorMessage: string | undefined = '';

  constructor(public errorHandler: ErrorHandlerService) {}

  ngOnInit(): void {
    const error = this.errorHandler.getCurrentError();
    if (error.hasError) {
      this.errorCode = error.errorCode;
      this.errorMessage = error.errorMessage;
    }
  }

  ngOnDestroy(): void {
    this.errorHandler.clearError(); // Сбрасываем ошибку при уничтожении компонента
  }
}
