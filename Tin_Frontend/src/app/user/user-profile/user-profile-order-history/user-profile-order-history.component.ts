import { Component } from '@angular/core';
import {UserProfileOrderItemComponent} from './user-profile-order-item/user-profile-order-item.component';
import {NgForOf} from '@angular/common';
import {UserProfileOrderItemModel} from './user-profile-order-item/user-profile-order-item.model';

@Component({
  selector: 'app-user-profile-order-history',
  standalone: true,
  imports: [
    UserProfileOrderItemComponent,
    NgForOf
  ],
  templateUrl: './user-profile-order-history.component.html',
  styleUrl: './user-profile-order-history.component.css'
})
export class UserProfileOrderHistoryComponent {
  public orderList: UserProfileOrderItemModel[] = [
    {
      orderId: '1001',
      date: '2024-11-01',
      total: 120.0,
      status: 'Completed',
    },
    {
      orderId: '1002',
      date: '2024-11-01',
      total: 120.0,
      status: 'Completed',
    },
    {
      orderId: '1003',
      date: '2024-11-01',
      total: 120.0,
      status: 'Pending',
    },
    {
      orderId: '1004',
      date: '2024-12-04',
      total: 100.0,
      status: 'Canceled',
    },
  ];

}
