import {Component, OnInit} from '@angular/core';
import {
  UserProfileOrderHistoryComponent
} from '../../../user/user-profile/user-profile-order-history/user-profile-order-history.component';
import {BookDetailsService} from './book-details.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {BookDetailsModel} from '../../../models/books/book-details.model';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [
    UserProfileOrderHistoryComponent,
    RouterLink
  ],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent implements OnInit {
  public bookDetails!: BookDetailsModel;
  constructor(private bookDetailsService: BookDetailsService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(data=>{
      this.bookDetails= data['bookDetails'];
      console.log(this.bookDetails);
    })
  }
}
