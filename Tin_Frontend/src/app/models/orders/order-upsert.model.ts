import {OrderItemModel} from '../order-item/order-item.model';

export interface OrderUpsertModel {
  client:{
    id:number,
    name: string,
    email: string
  },
  deliveryDetails:{
    name: string,
    phone: string,
    city: string,
    street: string,
    unit:number,
    postalCode:string,
  },
  orderDetails:{
    id: string,
    date: string,
    status: string,
    totalPrice: number,
  },
  orderItems:OrderItemModel[]
}
