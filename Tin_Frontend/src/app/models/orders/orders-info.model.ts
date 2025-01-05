import {OrdersInfoItemModel} from './orders-info-item.model';

export interface OrdersInfoModel {
  totalCount :number,
  totalPages : number,
  pageNumber :1,
  pageSize: 10
  orders: OrdersInfoItemModel[]
}
