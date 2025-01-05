import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../cart-order/cart.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'], // Исправлено название свойства styleUrls
})
export class NavigationComponent {
  cartItemCount: number = 0;

  constructor(protected cartService: CartService) {
    // Подписка на изменения корзины
    this.cartService.cart$.subscribe((items) => {
      this.cartItemCount = items.reduce((total, item) => total + item.quantity, 0);
    });
  }
}
