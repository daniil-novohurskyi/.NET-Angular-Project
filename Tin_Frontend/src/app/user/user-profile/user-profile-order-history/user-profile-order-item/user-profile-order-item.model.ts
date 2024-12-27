export interface UserProfileOrderItemModel{
  orderId: string;
  date: string;
  total: number;
  status: 'Completed' | 'Pending' | 'Canceled';
}
