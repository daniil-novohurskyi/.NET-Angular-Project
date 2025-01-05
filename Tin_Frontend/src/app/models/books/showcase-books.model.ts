import {ShowcaseBookCardModel} from './showcase-book-card.model';

export interface ShowcaseBooksModel {
  totalCount :number,
  totalPages : number,
  pageNumber :number,
  pageSize: number,
  books: ShowcaseBookCardModel[]
}
