import { Injectable } from '@angular/core';
import {ApiService} from '../../../api/api.service';
import {ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot} from '@angular/router';
import {UsersInfoModel} from '../../../models/users/users-info.model';

@Injectable({
  providedIn: 'root'
})
export class OrderUpsertResolverService implements Resolve<any>{

  constructor(private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<UsersInfoModel> {
    const orderId = route.params['id'];
    return this.apiService.get<UsersInfoModel>(`admin/orders/${orderId}/edit`);
  }
}
