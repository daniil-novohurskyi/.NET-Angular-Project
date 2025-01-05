import { Injectable } from '@angular/core';
import {ApiService} from '../../../api/api.service';
import {OrderUpsertModel} from '../../../models/orders/order-upsert.model';
import {OrderUpsertRequestModel} from '../../../models/orders/order-upsert-request.model';

@Injectable({
  providedIn: 'root'
})
export class OrderUpsertService {
  public orderUpsertModel: OrderUpsertModel={
    client: {email: '', id: 0, name: ''},
    deliveryDetails: {city: '', name: '', phone: '', postalCode: '', street: '', unit: 0},
    orderDetails: {date: '', id: '', status: '', totalPrice: 0},
    orderItems:[]
  };


  constructor(public apiService: ApiService) { }

  updateOrder(orderId:number, formValue:any ) {
    this.apiService.put(`admin/orders/${orderId}/edit`,formValue).subscribe(orderUpsert => {
      console.log(orderUpsert);
    });
  }

  createOrder(orderUpsertRequest: OrderUpsertRequestModel) {
    this.apiService.post(`admin/orders/new`,orderUpsertRequest).subscribe(orderUpsert => {
      console.log(orderUpsert);
    })
  }
}
