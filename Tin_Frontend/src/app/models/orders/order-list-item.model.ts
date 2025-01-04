export interface OrderListItemModel {
  id: string;
  date: string;
  totalPrice: number;
  status: 'Completed' | 'Pending' | 'Canceled';
}
