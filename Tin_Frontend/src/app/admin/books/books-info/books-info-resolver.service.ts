import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot} from '@angular/router';
import {BooksInfoModel} from '../../../models/books/books-info.model';
import {ApiService} from '../../../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class BooksInfoResolverService implements Resolve<BooksInfoModel> {

  constructor(private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<BooksInfoModel> {
        return this.apiService.get<BooksInfoModel>(`admin/books/paginated`,{pageNum:1});
    }
}

