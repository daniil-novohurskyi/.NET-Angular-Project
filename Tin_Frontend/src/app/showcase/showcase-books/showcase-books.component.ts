import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';
import {ShowcaseBookCardComponent} from './showcase-book-card/showcase-book-card.component';
import {BookCardModel} from './showcase-book-card/book-card.model';
import {PaginationComponent} from '../../common/pagination/pagination.component';

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
  bookCards: BookCardModel[] = [
    {
      id: "1",
      title: "Complete Works of William Shakespeare",
      price: 195.0,
      imageUrl: "/public/images/books_titles/city_of_orange_david_yoon.jpeg"
    },
    {
      id: "2",
      title: "Picture of Dorian Gray",
      price: 98.0,
      imageUrl: "/public/images/books_titles/soul_olivia_wilson.jpg"
    },
    {
      id: "3",
      title: "Five Novels by Charles Dickens",
      price: 195.0,
      imageUrl: "/public/images/books_titles/The_Lord_of_the_Rings.jpg"
    },
    {
      id: "4",
      title: "Complete Works of William Shakespeare",
      price: 195.0,
      imageUrl: "/public/images/books_titles/the_innovation_paradigm_taylor_avery.jpg"
    },
    {
      id: "5",
      title: "Picture of Dorian Gray",
      price: 98.0,
      imageUrl: "/public/images/books_titles/the-godfather-b-iext162736576.jpg"
    },
    {
      id: "6",
      title: "Five Novels by Charles Dickens",
      price: 195.0,
      imageUrl: "/public/images/books_titles/Harry_Potter_and_the_Cursed_Child.jpg"
    },
    {
      id: "7",
      title: "Complete Works of William Shakespeare",
      price: 195.0,
      imageUrl: "/public/images/books_titles/cover-books-design-illustrations.jpg"
    },
    {
      id: "8",
      title: "Picture of Dorian Gray",
      price: 98.0,
      imageUrl: "/public/images/books_titles/71jD4jMityL._AC_UF1000,1000_QL80_.jpg"
    }
  ];

}
