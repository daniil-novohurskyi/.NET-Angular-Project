import { Injectable } from '@angular/core';
import {ApiService} from '../../api/api.service';
import {ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot} from '@angular/router';
import {ShowcaseBookModel} from '../../models/books/showcase-book.model';

@Injectable({
  providedIn: 'root'
})
export class ShowcaseBookResolverService implements Resolve<ShowcaseBookModel> {

  constructor(private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<ShowcaseBookModel> {
    const id = route.params['id'];
    return  this.apiService.get(`showcase/${id}`,{pageNum: 1});
  }
}
