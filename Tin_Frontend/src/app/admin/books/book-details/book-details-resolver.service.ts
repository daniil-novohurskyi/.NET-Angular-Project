import { Injectable } from '@angular/core';
import {BookDetailsModel} from '../../../models/books/book-details.model';
import {ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot} from '@angular/router';
import {ApiService} from '../../../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class BookDetailsResolverService implements Resolve<BookDetailsModel> {

  constructor(private apiService: ApiService) {}


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<BookDetailsModel> {
    const isbn = route.paramMap.get('id');
    return this.apiService.get<BookDetailsModel>(`admin/books/${isbn}/details`);
    }
}
