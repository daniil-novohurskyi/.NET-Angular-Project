import {Component, Input, Output} from '@angular/core';
import {UserProfileOrderItemComponent} from './user-profile-order-item/user-profile-order-item.component';
import {NgForOf} from '@angular/common';
import {OrderListItemModel} from '../../../models/orders/order-list-item.model';
import {ActivatedRoute, RouterLink} from '@angular/router';

@Component({
  selector: 'app-user-profile-order-history',
  standalone: true,
  imports: [
    UserProfileOrderItemComponent,
    NgForOf,
    RouterLink
  ],
  templateUrl: './user-profile-order-history.component.html',
  styleUrl: './user-profile-order-history.component.css'
})
export class UserProfileOrderHistoryComponent {
  @Input() public orderList!: OrderListItemModel[];
  constructor(private route : ActivatedRoute) {
  }
  itemRoute(orderItem: OrderListItemModel) {
    if(this.route.snapshot.url.at(0)!.path == "profile"){
      return orderItem.id;
    }else{
      return `../../orders/${orderItem.id}`;
    }
  }

}
