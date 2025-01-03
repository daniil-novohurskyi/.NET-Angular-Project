import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot} from '@angular/router';
import { ApiService } from '../../../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class BookUpsertResolverService implements Resolve<any> {
  constructor(private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<any> {
    return this.apiService.get(`admin/books/${route.params['id']}/edit`);
  }
}
