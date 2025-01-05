import { Injectable } from '@angular/core';
import {ShowcaseBooksModel} from '../models/books/showcase-books.model';
import {ApiService} from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ShowcaseService {
  public showcaseModel!: ShowcaseBooksModel;


  constructor(private apiService: ApiService) { }

  getPaginatedBooks(page: number) {
    this.apiService.get<ShowcaseBooksModel>('showcase',{pageNum:page})
      .subscribe(books => {
        this.showcaseModel = books;
      })
  }
}
