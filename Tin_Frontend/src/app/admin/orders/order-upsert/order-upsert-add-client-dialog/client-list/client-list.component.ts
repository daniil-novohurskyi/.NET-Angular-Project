import { Component } from '@angular/core';
import {ClientItemComponent} from './client-item/client-item.component';
import {ClientModel} from './client-item/client-item.model';
import {NgForOf} from '@angular/common';

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
  clients: ClientModel[] = [
    {
      email: "john.doe@example.com",
      name: "John Doe",
      phone: "+123-456-789",
    },
    {
      email: "john.doe@example.com",
      name: "John Doe",
      phone: "+123-456-789",
    },
    {
      email: "john.doe@example.com",
      name: "John Doe",
      phone: "+123-456-789",
    },
    {
      email: "john.doe@example.com",
      name: "John Doe",
      phone: "+123-456-789",
    },
    {
      email: "john.doe@example.com",
      name: "John Doe",
      phone: "+123-456-789",
    },
  ];


}
