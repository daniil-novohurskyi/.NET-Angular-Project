import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-showcase-book',
  standalone: true,
  imports: [],
  templateUrl: './showcase-book.component.html',
  styleUrl: './showcase-book.component.css'
})
export class ShowcaseBookComponent {

  constructor(private router: Router) {
  }
  OnGoBackToList() {
    this.router.navigate(['..']);
  }

  OnAddToCart() {
    //TODO:Adding book to a cart (need to be authorized)
  }
}
