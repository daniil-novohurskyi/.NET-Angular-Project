import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, ReactiveFormsModule, ValidatorFn} from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {UserUpsertService} from './user-upsert.service';

@Component({
  selector: 'app-user-upsert',
  templateUrl: './user-upsert.component.html',
  styleUrls: ['./user-upsert.component.css'],
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgClass
  ],
  standalone: true
})
export class UserUpsertComponent implements OnInit {
  @Input() mode: 'update' | 'create' = 'create';
  showComponent = false;
  personalInfoForm: FormGroup;
  accountForm: FormGroup;

  constructor(private route:ActivatedRoute,private userUpsertService: UserUpsertService,private router: Router) {
      this.personalInfoForm = new FormGroup({
      role: new FormControl('client', Validators.required),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^\+?\d{1,4}[\d\s-]+$/)]),
      city: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      unit: new FormControl('', Validators.required),
      postalCode: new FormControl('', [Validators.required, Validators.pattern(/^\d{2}-\d{3}$/)]),
    });

    this.accountForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('',conditionalPasswordValidator() ),
      confirmPassword: new FormControl('')
    },{
      validators: passwordMatchValidator
    });
  }

  ngOnInit(): void {
    const isUpdate = this.route.snapshot.paramMap.has('id');  // Проверяем, есть ли параметр 'id' в URL
    this.mode = !isUpdate ? 'create' : 'update';

    if(this.mode === 'update') {
      this.route.data.subscribe(data => {
        this.userUpsertService.userUpsert = data['userUpsert'];
        console.log(this.userUpsertService.userUpsert);
      });
      //if not this timeout Add book and header icon will not render -_-
    } else{
      setTimeout(() => {
      }, 1);
    }
    if(this.mode === 'update') {
      this.personalInfoForm.setValue({
        role:this.userUpsertService.userUpsert.role,
        name: this.userUpsertService.userUpsert.name,
        phone:this.userUpsertService.userUpsert.phone,
        city: this.userUpsertService.userUpsert.city,
        street:this.userUpsertService.userUpsert.street,
        unit: this.userUpsertService.userUpsert.unit,
        postalCode: this.userUpsertService.userUpsert.postalCode,
      });
      this.accountForm.patchValue({
        email: this.userUpsertService.userUpsert.email
      })
    }
    }

  onSubmit(): void {
    if (this.personalInfoForm.touched && this.personalInfoForm.valid) {
      console.log('Personal Info Submitted:', this.personalInfoForm.value);
      if(this.mode === 'update') {
        const userId = this.route.snapshot.params['id'];
        this.userUpsertService.updateUserProfileInfo(userId,this.personalInfoForm.value);
      }
    }
    if (this.accountForm.touched && this.accountForm.valid) {
      if(this.mode === 'update') {
        console.log("credentials update");
        const userId = this.route.snapshot.params['id'];
        console.log(this.accountForm.value);
        this.userUpsertService.updateUserCredentials(userId,this.accountForm.value);
      }
    }
    if(this.accountForm.valid && this.personalInfoForm.valid && this.mode === 'create') {
      const mergedForm = new FormGroup({});

// Add controls from the first group
      Object.keys(this.personalInfoForm.controls).forEach((key) => {
        mergedForm.addControl(key, this.personalInfoForm.get(key) as FormControl);
      });

// Add controls from the second group
      Object.keys(this.accountForm.controls).forEach((key) => {
        if(key !== "confirmPassword")
          mergedForm.addControl(key, this.accountForm.get(key) as FormControl);
      });
      console.log(mergedForm);
      this.userUpsertService.createUser(mergedForm.value);
    }
    setTimeout(()=>{
    this.router.navigate(['admin/users']);

    },100);
  }
}

import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  if (password !== confirmPassword) {
    return { passwordsMismatch: true }; // Validation error if passwords don't match
  }
  return null; // Valid if passwords match
}

export function conditionalPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    if (value.length < 8) {
      return { passwordTooShort: { requiredLength: 8, actualLength: value.length } };
    }

    return null;
  };
}


