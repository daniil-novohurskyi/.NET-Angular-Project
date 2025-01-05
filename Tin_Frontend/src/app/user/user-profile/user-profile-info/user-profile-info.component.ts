import {Component, Input} from '@angular/core';
import {UserProfileInfoModel} from '../../../models/users/user-profile-info.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-user-profile-info',
  standalone: true,
  imports: [],
  templateUrl: './user-profile-info.component.html',
  styleUrl: './user-profile-info.component.css'
})
export class UserProfileInfoComponent {
  @Input() userProfileInfo!:UserProfileInfoModel;

  constructor(private route:ActivatedRoute,private router:Router) {
  }

    OnEdit() {
      this.router.navigate(['edit'],{relativeTo: this.route});
        //TODO:Action on clicking Edit button
    }
}
