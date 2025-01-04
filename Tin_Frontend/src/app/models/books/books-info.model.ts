import {BooksInfoItemModel} from './books-info-item.model';

export interface BooksInfoModel {
  totalCount :number,
  totalPages : number,
  pageNumber :1,
  pageSize: 10
  books: BooksInfoItemModel[]
}
