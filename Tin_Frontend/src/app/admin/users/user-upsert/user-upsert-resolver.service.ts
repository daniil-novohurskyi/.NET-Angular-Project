import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot} from '@angular/router';
import { ApiService } from '../../../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class UserUpsertResolverService implements Resolve<any> {
  constructor(private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<any> {
    return this.apiService.get(`admin/users/${route.params['id']}/edit`);
  }
}
