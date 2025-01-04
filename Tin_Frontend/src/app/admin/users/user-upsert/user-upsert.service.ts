import { Injectable } from '@angular/core';
import {ApiService} from '../../../api/api.service';
import {UserUpsertModel} from '../../../models/users/user-upsert.model';

@Injectable({
  providedIn: 'root'
})
export class UserUpsertService {
  public userUpsert!: UserUpsertModel;
  constructor(private apiService: ApiService) {
  }

  updateUserProfileInfo(userId:number, formValue:any ) {
    this.apiService.put(`admin/users/${userId}/info/edit`,formValue).subscribe(userUpsert => {
      console.log(userUpsert);
    });
  }

  updateUserCredentials(userId:number, formValue:any ) {
    this.apiService.put(`admin/users/${userId}/credentials/edit`,formValue).subscribe(userUpsert => {
      console.log(userUpsert);
    });
  }
  createUser(formValue:any){
    this.apiService.postFormData(`admin/users/new`, formValue).subscribe(bookUpsert => {
      console.log(bookUpsert);
    })
  }
}
