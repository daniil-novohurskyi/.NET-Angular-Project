import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-log-reg',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIf
  ],
  templateUrl: './log-reg.component.html',
  styleUrls: ['./log-reg.component.css'],
})
export class LogRegComponent {
  logRegForm: FormGroup;
  passwordVisible: boolean = false;
  formSubmitted: boolean = false;

  constructor() {
    this.logRegForm = new FormGroup({
      //TODO:Add custom validator for password
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit() {
   //TODO:Action on login
  }

  onRegister() {
    //TODO:Action on register
  }
}
