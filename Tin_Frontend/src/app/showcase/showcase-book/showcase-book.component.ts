import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ShowcaseBookService} from './showcase-book.service';
import {CartService} from '../../cart-order/cart.service';
import {OrderItemModel} from '../../models/order-item/order-item.model';

@Component({
  selector: 'app-showcase-book',
  standalone: true,
  imports: [],
  templateUrl: './showcase-book.component.html',
  styleUrl: './showcase-book.component.css'
})
export class ShowcaseBookComponent implements OnInit {

  constructor(private router: Router
              ,private route:ActivatedRoute,
              public showcaseBookService: ShowcaseBookService,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data=>{
      this.showcaseBookService.showcaseBook = data['showcase'];
    });
  }
  OnGoBackToList() {
    this.router.navigate(['..']);
  }

  OnAddToCart() {
    const isbn = this.route.snapshot.params['id'];
    const orderItem:OrderItemModel ={
      coverUrl: this.showcaseBookService.showcaseBook.coverUrl,
      isbn: isbn,
      price: this.showcaseBookService.showcaseBook.price,
      pricePerUnit: this.showcaseBookService.showcaseBook.price,
      quantity: 1,
      title: this.showcaseBookService.showcaseBook.title,
    };
    console.log(orderItem);
    this.cartService.addToCart(orderItem);
    this.router.navigate(['..']);
    //TODO:Adding book to a cart (need to be authorized)

  }
}
