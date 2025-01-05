import { Injectable } from '@angular/core';
import {ShowcaseBookModel} from '../../models/books/showcase-book.model';

@Injectable({
  providedIn: 'root'
})
export class ShowcaseBookService {
  public showcaseBook!: ShowcaseBookModel;

  constructor() { }
}
