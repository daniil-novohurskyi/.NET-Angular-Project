import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot} from '@angular/router';
import {ApiService} from '../../../api/api.service';
import {OrderUpsertModel} from '../../../models/orders/order-upsert.model';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsResolverService implements Resolve<OrderUpsertModel> {

  constructor(private apiService: ApiService) {}


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<OrderUpsertModel> {
    const isbn = route.paramMap.get('id');
    return this.apiService.get<OrderUpsertModel>(`admin/orders/${isbn}/details`);
  }
}
