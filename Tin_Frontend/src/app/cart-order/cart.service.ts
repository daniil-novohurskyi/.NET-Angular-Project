import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderItemModel } from '../models/order-item/order-item.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private orderItems: OrderItemModel[] = [];
  private cartSubject = new BehaviorSubject<OrderItemModel[]>(this.orderItems);

  cart$ = this.cartSubject.asObservable();

  constructor() {
    this.loadCartFromLocalStorage();
  }

  private loadCartFromLocalStorage(): void {
    if (typeof window !== 'undefined' && localStorage) {
      console.log(window);
      console.log(localStorage);
      const cartData = localStorage.getItem('cartItems');
      if (cartData) {
        try {
          this.orderItems = JSON.parse(cartData) || [];
        } catch (error) {
          console.error('Error parsing cart data from localStorage:', error);
          this.orderItems = [];
        }
      }
      this.cartSubject.next([...this.orderItems]);
    } else {
      console.warn('localStorage is not available.');
    }
  }

  private saveCartToLocalStorage(): void {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem('cartItems', JSON.stringify(this.orderItems));
    }
  }

  addToCart(item: OrderItemModel): void {
    const existingItem = this.orderItems.find((cartItem) => cartItem.isbn === item.isbn);
    if (existingItem) {
      existingItem.quantity += 1;
      existingItem.price = existingItem.quantity * existingItem.pricePerUnit;
    } else {
      this.orderItems.push(item);
    }
    this.saveCartToLocalStorage();
    this.cartSubject.next([...this.orderItems]);
  }

  removeFromCart(isbn: string): void {
    const deleteItem = this.orderItems.find((cartItem) => cartItem.isbn === isbn);
    if(deleteItem) {
      deleteItem.quantity -= 1;
      if (deleteItem.quantity == 0) {
        this.orderItems = this.orderItems.filter((item) => item.isbn !== isbn);
      }
    }
    this.saveCartToLocalStorage();
    this.cartSubject.next([...this.orderItems]);
  }


  clearCart(): void {
    this.orderItems = [];
    this.saveCartToLocalStorage();
    this.cartSubject.next([]);
  }
  getCartItems(): OrderItemModel[] {
    return this.orderItems;
  }
}
