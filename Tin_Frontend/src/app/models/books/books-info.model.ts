import {BooksInfoItemModel} from './books-info-item.model';

export interface BooksInfoModel {
  totalCount :number,
  totalPages : number,
  pageNumber :number,
  pageSize: number,
  books: BooksInfoItemModel[]
}
