import {Component, Input} from '@angular/core';
import {BookItemModel} from './book-item.model';

@Component({
  selector: 'app-books-list-item',
  standalone: true,
  imports: [],
  templateUrl: './books-list-item.component.html',
  styleUrl: './books-list-item.component.css'
})
export class BooksListItemComponent {
  @Input() public book!:BookItemModel;

}
