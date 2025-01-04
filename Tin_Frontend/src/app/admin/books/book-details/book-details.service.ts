import { Injectable } from '@angular/core';
import {ApiService} from '../../../api/api.service';
import {BookDetailsModel} from '../../../models/books/book-details.model';

@Injectable({
  providedIn: 'root'
})
export class BookDetailsService {
  public bookDetails!: BookDetailsModel;

  constructor(private apiService: ApiService) { }
}
