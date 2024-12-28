import { Component } from '@angular/core';
import {PaginationComponent} from '../../../common/pagination/pagination.component';

@Component({
  selector: 'app-users-info',
  standalone: true,
  imports: [
    PaginationComponent
  ],
  templateUrl: './users-info.component.html',
  styleUrl: './users-info.component.css'
})
export class UsersInfoComponent {

}
