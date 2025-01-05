import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot} from '@angular/router';
import {ApiService} from '../../../api/api.service';
import {UsersInfoModel} from '../../../models/users/users-info.model';

@Injectable({
  providedIn: 'root'
})
export class UsersInfoResolverService implements Resolve<UsersInfoModel> {

  constructor(private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<UsersInfoModel> {
    return this.apiService.get<UsersInfoModel>(`admin/users/paginated`,{pageNum:1});
  }
}

