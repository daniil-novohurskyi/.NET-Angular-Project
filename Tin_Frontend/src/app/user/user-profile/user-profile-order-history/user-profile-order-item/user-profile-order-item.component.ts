import {Component, Input} from '@angular/core';
import {OrderListItemModel} from '../../../../models/orders/order-list-item.model';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-user-profile-order-item',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './user-profile-order-item.component.html',
  styleUrl: './user-profile-order-item.component.css'
})
export class UserProfileOrderItemComponent {
  @Input() public orderItem!: OrderListItemModel;

}
