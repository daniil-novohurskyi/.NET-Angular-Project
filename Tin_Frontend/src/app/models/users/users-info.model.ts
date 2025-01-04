import {UsersInfoItemModel} from './users-info-item.model';

export interface UsersInfoModel {
  totalCount :number,
  totalPages : number,
  pageNumber :1,
  pageSize: 10
  users: UsersInfoItemModel[]
}
