import { Component } from '@angular/core';
import {UserProfileInfoComponent} from './user-profile-info/user-profile-info.component';
import {UserProfileOrderHistoryComponent} from './user-profile-order-history/user-profile-order-history.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    UserProfileInfoComponent,
    UserProfileOrderHistoryComponent
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

}
