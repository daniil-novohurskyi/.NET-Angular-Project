import { Injectable } from '@angular/core';
import {ApiService} from '../../../../api/api.service';
import {OrderUpsertService} from '../order-upsert.service';
import {PaginatedOrderItemsModel} from '../../../../models/paginated-order-items.model';
import {BehaviorSubject} from 'rxjs';
import {OrderItemModel} from '../../../../models/order-item/order-item.model';

@Injectable({
  providedIn: 'root'
})
export class AddBookService {
  public paginatedOrderItems:PaginatedOrderItemsModel = {
    orderItems: [], pageNumber: 1, pageSize: 10, totalCount: 0, totalPages: 0
  };
  public pickedOrderItems: OrderItemModel[] = [];

  private addOrderItemSubject = new BehaviorSubject<OrderItemModel | null>(null);
  addOrderItem$ = this.addOrderItemSubject.asObservable();

  private removeOrderItemSubject = new BehaviorSubject<OrderItemModel | null>(null);
  removeOrderItem$ = this.removeOrderItemSubject.asObservable();

  private orderItemsSubject = new BehaviorSubject<OrderItemModel[]>([]);
  orderItems$ = this.orderItemsSubject.asObservable();

  constructor(private apiService: ApiService,private orderUpsertService: OrderUpsertService) {

  }

  updateOrderItems(orderItems: OrderItemModel[]) {
    this.orderItemsSubject.next(orderItems); // Если используется BehaviorSubject
  }

  getBooksNotFromOrder(pageNum:number){
    const booksInCartIsbns = this.orderUpsertService.orderUpsertModel.
    orderItems.map<string>(orderItem => orderItem.isbn);
    this.apiService.post<PaginatedOrderItemsModel>('admin/books/paginated', booksInCartIsbns,{pageNum:pageNum})
      .subscribe(data => {
        this.paginatedOrderItems= data
        this.paginatedOrderItems.orderItems.forEach(orderItemFromBackend => {
          const matchedItem = this.pickedOrderItems.find(pickedItem => pickedItem.isbn === orderItemFromBackend.isbn);
          if (matchedItem) {
            orderItemFromBackend.quantity = matchedItem.quantity;
          }
        });
        console.log(data);
      });
  }

  resetOrderItems() {
    this.orderItemsSubject.next([]); // Сбрасываем поток
  }

  setBooksForOrder(orderItems: OrderItemModel[]){
    this.orderItemsSubject.next(orderItems);
    this.pickedOrderItems = [];
  }
}
