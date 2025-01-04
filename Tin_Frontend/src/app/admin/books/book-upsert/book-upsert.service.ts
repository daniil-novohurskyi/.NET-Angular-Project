import { Injectable } from '@angular/core';
import {BookUpsertModel} from '../../../models/books/book-upsert.model';
import {ApiService} from '../../../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class BookUpsertService {
 public bookUpsert!: BookUpsertModel;
  constructor(private apiService: ApiService) {
  }


  getBookById(id: string) {
    this.apiService.get<BookUpsertModel>(`admin/books/${id}/edit`)
      .subscribe(bookUpsert => {
        this.bookUpsert = bookUpsert;
      });
  }
  updateBook(bookId:string, formData:FormData){
    this.apiService.putFormData(`admin/books/${bookId}/edit`, formData).subscribe(bookUpsert => {
      console.log(bookUpsert);
    });
  }
  createBook(formData:FormData){
    this.apiService.postFormData(`admin/books/new`, formData).subscribe(bookUpsert => {
      console.log(bookUpsert);
    })
  }
}
