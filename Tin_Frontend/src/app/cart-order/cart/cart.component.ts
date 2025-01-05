import {Component, OnInit} from '@angular/core';
import {CartListItemComponent} from './cart-list-item/cart-list-item.component';
import {NgForOf, NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {CartService} from '../cart.service';
import {OrderItemModel} from '../../models/order-item/order-item.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CartListItemComponent,
    NgForOf,
    RouterLink,
    NgIf
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  constructor(private router: Router, protected cartService: CartService) {
  }

  ngOnInit(): void {
  }


  OnContinueShopping() {
    this.router.navigate(['/showcase']);
    //TODO: Action on continue shopping
  }

  OnMinusItem(item: OrderItemModel) {
    this.cartService.removeFromCart(item.isbn);
  }

  OnPlusItem(bookItem: OrderItemModel) {
    this.cartService.addToCart(bookItem);
  }
}
