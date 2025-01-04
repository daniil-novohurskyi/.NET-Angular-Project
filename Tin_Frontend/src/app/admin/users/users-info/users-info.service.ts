import { Injectable } from '@angular/core';
import {UsersInfoModel} from '../../../models/users/users-info.model';
import {ApiService} from '../../../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class UsersInfoService {
  public usersInfo!: UsersInfoModel;

  constructor(private apiService: ApiService) {
  }

  getPaginatedUsers(page: number) {
    this.apiService.get<UsersInfoModel>('admin/users/paginated',{pageNum:page})
      .subscribe(users => {
        this.usersInfo = {...users};
      })
  }

  deleteUser(userId: number) {
    return this.apiService.delete(`admin/users/${userId}`);
  }
}
