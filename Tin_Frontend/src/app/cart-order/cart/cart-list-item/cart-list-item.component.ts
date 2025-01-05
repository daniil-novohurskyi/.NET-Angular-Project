import {Component, EventEmitter, Input, Output} from '@angular/core';
import {OrderItemModel} from '../../../models/order-item/order-item.model';

@Component({
  selector: 'app-cart-list-item',
  standalone: true,
  imports: [],
  templateUrl: './cart-list-item.component.html',
  styleUrl: './cart-list-item.component.css'
})
export class CartListItemComponent {
  @Input() public book!:OrderItemModel;
  @Output() minusItem = new EventEmitter<OrderItemModel>();
  @Output() plusItem = new EventEmitter<OrderItemModel>();
  @Output() changeItem = new EventEmitter<OrderItemModel>();



  OnMinus() {
    this.minusItem.emit(this.book); // Notify the parent

  }

  OnPlus() {
    this.plusItem.emit(this.book);
  }

  // OnChange(num:number) {
  //   this.book.quantity += num;
  //   this.changeItem.emit(this.book);
  // }
}
