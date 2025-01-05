import { Injectable } from '@angular/core';
import {ApiService} from '../../../../api/api.service';
import {UsersInfoModel} from '../../../../models/users/users-info.model';
import {ClientModel} from './client-list/client-item/client-item.model';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddClientService {
  public usersInfo!:UsersInfoModel;
  private customerSubject = new BehaviorSubject<ClientModel| null>(null);
  customer$ = this.customerSubject.asObservable();
  constructor(private apiService: ApiService) {

  }

  getUsers(){
    return this.apiService.get<UsersInfoModel>(`admin/users/paginated`,{pageNum:1})
      .subscribe(res => this.usersInfo = res);
  }

  setPickedCustomer(clientModel:ClientModel) {
    this.customerSubject.next(clientModel);
  }
}
