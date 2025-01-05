import {OrderListItemModel} from '../orders/order-list-item.model';
import {UserProfileInfoModel} from './user-profile-info.model';

export interface UserProfileModel{
  userInfo: UserProfileInfoModel;
  orders: OrderListItemModel[],
}
