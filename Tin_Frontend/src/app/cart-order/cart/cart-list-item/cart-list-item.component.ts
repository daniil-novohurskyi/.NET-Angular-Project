import {Component, Input} from '@angular/core';
import {CartListItemModel} from './cart-list-item.model';

@Component({
  selector: 'app-cart-list-item',
  standalone: true,
  imports: [],
  templateUrl: './cart-list-item.component.html',
  styleUrl: './cart-list-item.component.css'
})
export class CartListItemComponent {
  @Input() public book!:CartListItemModel;

}
