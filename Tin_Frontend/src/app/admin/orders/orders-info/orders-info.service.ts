import { Injectable } from '@angular/core';
import {ApiService} from '../../../api/api.service';
import {Observable} from 'rxjs';
import {OrdersInfoModel} from '../../../models/orders/orders-info.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersInfoService {
  public ordersInfoModel!: OrdersInfoModel;


  constructor(private apiService: ApiService) {
  }

  getPaginatedOrders(page: number) {
    this.apiService.get<OrdersInfoModel>('admin/orders/paginated',{pageNum:page})
      .subscribe(ordersInfo => {
        this.ordersInfoModel = ordersInfo;
      })
  }
  deleteOrder(id: string): Observable<any> {
    return  this.apiService.delete(`admin/orders/${id}`);
  }
}
