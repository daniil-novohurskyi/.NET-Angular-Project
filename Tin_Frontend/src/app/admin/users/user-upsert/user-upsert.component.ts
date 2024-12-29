import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-user-upsert',
  templateUrl: './user-upsert.component.html',
  styleUrls: ['./user-upsert.component.css'],
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  standalone: true
})
export class UserUpsertComponent {
  personalInfoForm: FormGroup;
  accountForm: FormGroup;

  constructor() {
    this.personalInfoForm = new FormGroup({
      role: new FormControl('client', Validators.required),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^\+?\d{1,4}[\d\s-]+$/)]),
      city: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      unit: new FormControl('', Validators.required),
      postalCode: new FormControl('', [Validators.required, Validators.pattern(/^\d{2}-\d{3}$/)]),
    });

    this.accountForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', Validators.required),
      // }, { validators: this.passwordMatchValidator });
    });
  }

  passwordMatchValidator(form: FormGroup): { [s: string]: boolean } | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  onSubmit(): void {
    if (this.personalInfoForm.touched && this.personalInfoForm.valid) {
      console.log('Personal Info Submitted:', this.personalInfoForm.value);
    }

    if (this.accountForm.touched && this.accountForm.valid) {
      console.log('Account Info Submitted:', this.accountForm.value);
    }
  }
}
