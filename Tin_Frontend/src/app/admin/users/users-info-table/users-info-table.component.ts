import { Component } from '@angular/core';
import {PaginationComponent} from '../../../common/pagination/pagination.component';

@Component({
  selector: 'app-users-info-table',
  standalone: true,
  imports: [
    PaginationComponent
  ],
  templateUrl: './users-info-table.component.html',
  styleUrl: './users-info-table.component.css'
})
export class UsersInfoTableComponent {

}
