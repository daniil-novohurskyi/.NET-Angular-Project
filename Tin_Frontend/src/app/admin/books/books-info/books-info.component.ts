import {Component, OnInit} from '@angular/core';
import {PaginationComponent} from "../../../common/pagination/pagination.component";
import {BooksInfoService} from './books-info.service';
import {NgForOf} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';

@Component({
  selector: 'app-books-info',
  standalone: true,
  imports: [
    PaginationComponent,
    NgForOf,
    RouterLink
  ],
  templateUrl: './books-info.component.html',
  styleUrl: './books-info.component.css'
})
export class BooksInfoComponent implements OnInit {

  constructor(protected booksInfoService: BooksInfoService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.booksInfoService.BooksInfoModel = data["booksInfo"];
    })
  }

  loadPageData(page: number): void {
    this.booksInfoService.getPaginatedBooks(page);
  }

  onPageChanged(page: number): void {
    this.loadPageData(page);  // Обновление данных при смене страницы
  }

  OnDelete(isbn: string): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.booksInfoService.deleteBook(isbn).subscribe({
        next: () => {
          // Reload the current page data after deletion
          const currentPage = this.booksInfoService.BooksInfoModel.pageNumber;
          const totalItems = this.booksInfoService.BooksInfoModel.totalCount;
          const pageSize = this.booksInfoService.BooksInfoModel.pageSize;

          // Check if the current page should be decremented
          const totalPages = Math.ceil((totalItems - 1) / pageSize);
          const pageToLoad = currentPage > totalPages ? totalPages : currentPage;

          this.loadPageData(pageToLoad);
        },
        error: (err) => {
          console.error('Error deleting book:', err);
          alert('Failed to delete the book. Please try again later.');
        }
      });
    }
  }
}
