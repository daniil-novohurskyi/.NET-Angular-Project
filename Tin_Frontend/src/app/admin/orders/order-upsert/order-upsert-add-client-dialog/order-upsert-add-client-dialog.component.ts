import { Component } from '@angular/core';
import {ClientListComponent} from './client-list/client-list.component';
import {MatDialogRef} from '@angular/material/dialog';
import {PaginationComponent} from '../../../../common/pagination/pagination.component';

@Component({
  selector: 'app-order-upsert-add-client-dialog',
  standalone: true,
  imports: [
    ClientListComponent,
    PaginationComponent
  ],
  templateUrl: './order-upsert-add-client-dialog.component.html',
  styleUrl: './order-upsert-add-client-dialog.component.css'
})

export class OrderUpsertAddClientDialogComponent {

  constructor(private matDialogRef: MatDialogRef<OrderUpsertAddClientDialogComponent>) {
  }

  onCloseDiaolog(): void {
    this.matDialogRef.close();
  }


}
