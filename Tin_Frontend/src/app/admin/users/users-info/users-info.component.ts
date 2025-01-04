import {Component, OnInit} from '@angular/core';
import {PaginationComponent} from '../../../common/pagination/pagination.component';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {NgForOf} from '@angular/common';
import {UsersInfoService} from './users-info.service';

@Component({
  selector: 'app-users-info',
  standalone: true,
  imports: [
    PaginationComponent,
    NgForOf,
    RouterLink
  ],
  templateUrl: './users-info.component.html',
  styleUrl: './users-info.component.css'
})
export class UsersInfoComponent implements OnInit {
  constructor(private route:ActivatedRoute,public usersInfoService: UsersInfoService
  ) {
  }

    ngOnInit(): void {
        this.route.data.subscribe(data => {
          this.usersInfoService.usersInfo = data["usersInfo"];
        })
    }

  loadPageData(page: number): void {
    this.usersInfoService.getPaginatedUsers(page);
  }

  onPageChanged(page: number): void {
    this.loadPageData(page);  // Обновление данных при смене страницы
  }

  OnDelete(userId: number) {
    if (confirm('Are you sure you want to delete this book?')) {
      this.usersInfoService.deleteUser(userId).subscribe({
        next: () => {
          // Reload the current page data after deletion
          const currentPage = this.usersInfoService.usersInfo.pageNumber;
          const totalItems = this.usersInfoService.usersInfo.totalCount;
          const pageSize = this.usersInfoService.usersInfo.pageSize;

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
