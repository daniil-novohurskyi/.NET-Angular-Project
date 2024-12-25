import {Component, Input} from '@angular/core';
import {BookCardModel} from './book-card.model';

@Component({
  selector: 'app-showcase-book-card',
  standalone: true,
  imports: [],
  templateUrl: './showcase-book-card.component.html',
  styleUrl: './showcase-book-card.component.css'
})
export class ShowcaseBookCardComponent {
  @Input() public bookCard!: BookCardModel;

  constructor() {
  }

}
