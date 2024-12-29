import { Component } from '@angular/core';
import {CartListItemModel} from './cart-list-item/cart-list-item.model';
import {CartListItemComponent} from './cart-list-item/cart-list-item.component';
import {NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CartListItemComponent,
    NgForOf,
    RouterLink
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  protected books: CartListItemModel[] =  [
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

  OnContinueShopping() {
    //TODO: Action on continue shopping
  }
}
