import { Component } from '@angular/core';
import {
  UserProfileOrderItemModel
} from '../../../user/user-profile/user-profile-order-history/user-profile-order-item/user-profile-order-item.model';
import {
  UserProfileOrderHistoryComponent
} from '../../../user/user-profile/user-profile-order-history/user-profile-order-history.component';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [
    UserProfileOrderHistoryComponent
  ],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent {
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
