import { Injectable } from '@angular/core';
import {UserProfileModel} from '../../models/users/user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  public userProfile!: UserProfileModel;


  constructor() { }
}
