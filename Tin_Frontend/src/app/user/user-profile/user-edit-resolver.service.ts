import { Injectable } from '@angular/core';
import {UserProfileModel} from '../../models/users/user-profile.model';
import {ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot} from '@angular/router';
import {ApiService} from '../../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserEditResolverService implements Resolve<UserProfileModel> {

  constructor(private apiService: ApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<UserProfileModel> {
    return this.apiService.get<UserProfileModel>('admin/users/' + route.params['id'] + '/details');

    }
}
