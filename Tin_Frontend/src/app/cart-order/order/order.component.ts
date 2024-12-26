import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { BookItemModel } from '../books-list-item/book-item.model';
import { BooksListItemComponent } from '../books-list-item/books-list-item.component';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    BooksListItemComponent,
    NgForOf,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  orderForm: FormGroup;

  protected books: BookItemModel[] = [
    {
      imageSrc: "/public/images/books_titles/cover-books-design-illustrations.jpg",
      title: "Patchwork - Wojciech Garula",
      isbn: "(9788308081655)",
      quantity: 1,
      price: 38.75
    },
    {
      imageSrc: "/public/images/books_titles/71jD4jMityL._AC_UF1000,1000_QL80_.jpg",
      title: "Light of Books - Pavel Litvin",
      isbn: "(9788377852020)",
      quantity: 2,
      price: 45.99
    },
    {
      imageSrc: "/public/images/books_titles/Harry_Potter_and_the_Cursed_Child.jpg",
      title: "The Storyteller - Jane Doe",
      isbn: "(9788499923120)",
      quantity: 3,
      price: 52.30
    },
    {
      imageSrc: "/public/images/books_titles/the-godfather-b-iext162736576.jpg",
      title: "Adventures of Tomorrow - Mark Smith",
      isbn: "(9781234567890)",
      quantity: 1,
      price: 29.99
    },
    {
      imageSrc: "/public/images/books_titles/The_Lord_of_the_Rings.jpg",
      title: "Mystery of the Forest - Sarah Green",
      isbn: "(9789876543210)",
      quantity: 4,
      price: 60.50
    }
  ];

  constructor(private fb: FormBuilder) {
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
