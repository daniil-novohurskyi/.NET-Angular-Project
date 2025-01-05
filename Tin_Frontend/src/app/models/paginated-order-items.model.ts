import {OrderItemModel} from './order-item/order-item.model';

export interface PaginatedOrderItemsModel{
  totalCount :number,
  totalPages : number,
  pageNumber :1,
  pageSize: 10
  orderItems: OrderItemModel[]
}
