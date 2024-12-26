import {Component, Input} from '@angular/core';
import {BookCardModel} from './book-card.model';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-showcase-book-card',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './showcase-book-card.component.html',
  styleUrl: './showcase-book-card.component.css'
})
export class ShowcaseBookCardComponent {
  @Input() public bookCard!: BookCardModel;

  constructor() {
  }
}
