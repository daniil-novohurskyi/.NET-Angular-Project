import {OrderItemUpsertRequest} from '../order-item/order-item-upsert-request.model';

export interface OrderUpsertRequestModel{
  userId: number,
  deliveryDetails:{
    name: string,
    phone: string,
    city: string,
    street: string,
    unit:number,
    postalCode:string,
  },
  status: string,
  date: string,
  totalPrice: number,
  orderItems: OrderItemUpsertRequest[]
}
