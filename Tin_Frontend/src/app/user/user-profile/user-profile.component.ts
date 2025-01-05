import {Component, OnInit} from '@angular/core';
import {UserProfileInfoComponent} from './user-profile-info/user-profile-info.component';
import {UserProfileOrderHistoryComponent} from './user-profile-order-history/user-profile-order-history.component';
import {UserProfileService} from './user-profile.service';
import {ActivatedRoute} from '@angular/router';

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
export class UserProfileComponent implements OnInit {
  constructor(protected userProfileService: UserProfileService, private route: ActivatedRoute) { }

    ngOnInit(): void {
    this.route.data.subscribe(data=>{
      this.userProfileService.userProfile = data['userProfile'];
    });
    }

}
