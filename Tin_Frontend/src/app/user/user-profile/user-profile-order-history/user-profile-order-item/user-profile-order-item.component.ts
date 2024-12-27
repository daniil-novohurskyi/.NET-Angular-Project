import {Component, Input} from '@angular/core';
import {UserProfileOrderItemModel} from './user-profile-order-item.model';
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
  @Input() public orderItem!: UserProfileOrderItemModel;

  // orderStatusColor():string{
  //   switch (this.orderItem.status) {
  //     case "Completed":
  //       return "completed";
  //     case "Canceled":
  //       return "canceled";
  //     case "Pending":
  //       return "pending";
  //   }
  //}
}
