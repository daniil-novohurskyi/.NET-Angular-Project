import {Component, OnInit} from '@angular/core';
import {
  MatDialogRef,
} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {NgForOf} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {PaginationComponent} from '../../../../common/pagination/pagination.component';
import {CartListItemComponent} from '../../../../cart-order/cart/cart-list-item/cart-list-item.component';
import {AddBookService} from './add-book.service';
import {OrderItemModel} from '../../../../models/order-item/order-item.model';
@Component({
  selector: 'app-order-upsert-add-book-dialog',
  standalone: true,
  imports: [
    MatIconModule,
    MatInputModule,
    NgForOf,
    MatButtonModule,
    PaginationComponent,
    CartListItemComponent
  ],
  templateUrl: './order-upsert-add-book-dialog.component.html',
  styleUrls: ['./order-upsert-add-book-dialog.component.css'],
})
export class OrderUpsertAddBookDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<OrderUpsertAddBookDialogComponent>, protected addBookService:AddBookService) { }

  ngOnInit(): void {
    this.addBookService.getBooksNotFromOrder(1);
    }

  closeDialog() {
    this.dialogRef.close();
  }

  loadPageData(page: number): void {
    this.addBookService.getBooksNotFromOrder(page);
  }

  onPageChanged(page: number): void {
    this.loadPageData(page);  // Обновление данных при смене страницы
  }

  OnSubmit() {
    this.addBookService.setBooksForOrder([...this.addBookService.pickedOrderItems]);
    this.addBookService.pickedOrderItems = [];
    this.closeDialog();
  }

  OnRemove(item: OrderItemModel) {
    item.quantity--;
    const index = this.addBookService.pickedOrderItems.indexOf(item);
    if (index! > -1) {
      this.addBookService.pickedOrderItems?.splice(index!, 1);
    }
  }

  OnAdd(item: OrderItemModel) {
    item.quantity++;
    if (this.addBookService.pickedOrderItems.indexOf(item) == -1) {
    this.addBookService.pickedOrderItems?.push(item);
    }
  }

  protected readonly AddBookService = AddBookService;
}
