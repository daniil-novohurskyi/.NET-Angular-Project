import { Component } from '@angular/core';
import {PaginationComponent} from "../../../common/pagination/pagination.component";

@Component({
  selector: 'app-books-info',
  standalone: true,
    imports: [
        PaginationComponent
    ],
  templateUrl: './books-info.component.html',
  styleUrl: './books-info.component.css'
})
export class BooksInfoComponent {

}
