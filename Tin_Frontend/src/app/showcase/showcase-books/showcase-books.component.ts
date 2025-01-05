import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';
import {ShowcaseBookCardComponent} from './showcase-book-card/showcase-book-card.component';
import {PaginationComponent} from '../../common/pagination/pagination.component';
import {ShowcaseService} from '../showcase.service';

@Component({
  selector: 'app-showcase-books',
  standalone: true,
  imports: [
    NgForOf,
    ShowcaseBookCardComponent,
    PaginationComponent
  ],
  templateUrl: './showcase-books.component.html',
  styleUrl: './showcase-books.component.css'
})
export class ShowcaseBooksComponent {

  constructor(public showcaseService: ShowcaseService) {
  }

  loadPageData(page: number): void {
    this.showcaseService.getPaginatedBooks(page);
  }

  onPageChanged(page: number): void {
    this.loadPageData(page);  // Обновление данных при смене страницы
  }

}
