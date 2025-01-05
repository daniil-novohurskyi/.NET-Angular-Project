import {Component, OnInit} from '@angular/core';
import {PaginationComponent} from "../../../common/pagination/pagination.component";
import {ActivatedRoute, RouterLink} from '@angular/router';
import {OrdersInfoService} from './orders-info.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-orders-info',
  standalone: true,
  imports: [
    PaginationComponent,
    NgForOf,
    RouterLink,
    NgIf
  ],
  templateUrl: './orders-info.component.html',
  styleUrl: './orders-info.component.css'
})
export class OrdersInfoComponent implements OnInit {

  constructor(private route: ActivatedRoute,public ordersInfoService: OrdersInfoService) {
  }

    ngOnInit(): void {
        this.route.data.subscribe(data=>{
          this.ordersInfoService.ordersInfoModel = data['ordersInfo'];
        });
    }

  loadPageData(page: number): void {
    this.ordersInfoService.getPaginatedOrders(page);
  }

  onPageChanged(page: number): void {
    this.loadPageData(page);  // Обновление данных при смене страницы
  }

  OnDelete(id: string): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.ordersInfoService.deleteOrder(id).subscribe({
        next: () => {
          // Reload the current page data after deletion
          const currentPage = this.ordersInfoService.ordersInfoModel.pageNumber;
          const totalItems = this.ordersInfoService.ordersInfoModel.totalCount;
          const pageSize = this.ordersInfoService.ordersInfoModel.pageSize;

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
