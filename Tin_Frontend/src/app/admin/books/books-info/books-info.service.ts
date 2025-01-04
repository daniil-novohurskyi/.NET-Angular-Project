import { Injectable } from '@angular/core';
import {ApiService} from '../../../api/api.service';
import {BooksInfoModel} from '../../../models/books/books-info.model';
import {Observable, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksInfoService {
  public BooksInfoModel!: BooksInfoModel;


  constructor(private apiService: ApiService) {
  }

  getPaginatedBooks(page: number) {
    this.apiService.get<BooksInfoModel>('admin/books/paginated',{pageNum:page})
      .subscribe(booksInfo => {
        this.BooksInfoModel = booksInfo;
      })
  }
  deleteBook(isbn: string): Observable<any> {
     return  this.apiService.delete(`admin/books/${isbn}`);
  }
}
