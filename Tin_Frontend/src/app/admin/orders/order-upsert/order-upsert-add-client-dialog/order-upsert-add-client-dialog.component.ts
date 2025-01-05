import {Component, OnInit} from '@angular/core';
import {ClientListComponent} from './client-list/client-list.component';
import {MatDialogRef} from '@angular/material/dialog';
import {PaginationComponent} from '../../../../common/pagination/pagination.component';
import {AddClientService} from './add-client.service';

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

export class OrderUpsertAddClientDialogComponent implements OnInit {


  constructor(private matDialogRef: MatDialogRef<OrderUpsertAddClientDialogComponent>,public addClientService: AddClientService) {
  }

  ngOnInit(): void {
    this.addClientService.getUsers();
    }

  onCloseDiaolog(): void {
    this.matDialogRef.close();
  }


}
