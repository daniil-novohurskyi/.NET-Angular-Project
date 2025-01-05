import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot} from '@angular/router';
import {ApiService} from '../api/api.service';
import {ShowcaseBooksModel} from '../models/books/showcase-books.model';

@Injectable({
  providedIn: 'root'
})
export class ShowcaseResolverService implements Resolve<ShowcaseBooksModel> {

  constructor(private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<ShowcaseBooksModel> {
    return  this.apiService.get('showcase',{pageNum: 1});
  }
}
