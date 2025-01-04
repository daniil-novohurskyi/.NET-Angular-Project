import {OrderListItemModel} from '../orders/order-list-item.model';

export interface BookDetailsModel{
  isbn: string,
  title: string,
  author: string,
  genre: string,
  price: number,
  description: string,
  publishingYear: number,
  coverUrl: string,
  orders:OrderListItemModel[]
}
