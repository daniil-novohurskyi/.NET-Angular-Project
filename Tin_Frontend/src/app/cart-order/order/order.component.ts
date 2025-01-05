import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {OrderListItemComponent} from './order-list-item/order-list-item.component';
import {CartService} from '../cart.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    NgIf,
    OrderListItemComponent,
    RouterLink
  ],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orderForm: FormGroup;
  totalPrice!: number;

  constructor(private fb: FormBuilder,public cartService: CartService) {

    this.cartService.cart$.subscribe((items) => {
      this.totalPrice = items.reduce((total, item) => total + item.price, 0);
    });
    this.orderForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern(/^(\+?\d{1,3}?)?(\d{10})$/)]],
      email: ['', [Validators.required, Validators.email]],
      city: ['', [Validators.required]],
      address: ['', [Validators.required]],
      unit: ['',Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern(/^\d{2}-\d{3}$/)]]
    });
  }

  ngOnInit(): void {

  }

  get name() {
    return this.orderForm.get('name');
  }

  get phone() {
    return this.orderForm.get('phone');
  }

  get email() {
    return this.orderForm.get('email');
  }

  get city() {
    return this.orderForm.get('city');
  }

  get address() {
    return this.orderForm.get('address');
  }

  get unit() {
    return this.orderForm.get('unit');
  }

  get postalCode() {
    return this.orderForm.get('postalCode');
  }

  onSubmit() {
    if (this.orderForm.valid) {
      console.log(this.orderForm.value);
    }
  }

  OnConfirm() {
    //TODO: Action on confirm
  }
}
