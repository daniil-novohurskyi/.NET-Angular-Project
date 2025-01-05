import {Component, Input} from '@angular/core';
import {ClientItemComponent} from './client-item/client-item.component';
import {ClientModel} from './client-item/client-item.model';
import {NgForOf} from '@angular/common';
import {AddClientService} from '../add-client.service';
import {MatDialogRef} from '@angular/material/dialog';
import {OrderUpsertAddClientDialogComponent} from '../order-upsert-add-client-dialog.component';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [
    ClientItemComponent,
    NgForOf
  ],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent {
  @Input() clients?: ClientModel[];

  constructor(public addClientService: AddClientService,private matDialogRef: MatDialogRef<OrderUpsertAddClientDialogComponent>) {
  }

  pickClient(clientModel:ClientModel) {
    this.addClientService.setPickedCustomer(clientModel);
    this.matDialogRef.close();

  }

}
