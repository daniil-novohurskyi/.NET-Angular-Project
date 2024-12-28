import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule
} from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent {
  personalInfoForm: FormGroup;
  accountCredentialsForm: FormGroup;

  constructor() {
    this.personalInfoForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^\+\d{1,3}\s\d{3}\s\d{3}\s\d{3}$/)]),
      city: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      unit: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [Validators.required, Validators.pattern(/^\d{2}-\d{3}$/)])
    });

    this.accountCredentialsForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmPassword: new FormControl('', [Validators.required])
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmitPersonalInfo(): void {
    if (this.personalInfoForm.valid) {
      console.log('Personal Info:', this.personalInfoForm.value);
    }
  }

  onSubmitAccountCredentials(): void {
    if (this.accountCredentialsForm.valid) {
      console.log('Account Credentials:', this.accountCredentialsForm.value);
    }
  }
}
