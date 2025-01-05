import {Component, Input} from '@angular/core';
import {OrderItemModel} from '../../../models/order-item/order-item.model';

@Component({
  selector: 'app-order-list-item',
  standalone: true,
  imports: [],
  templateUrl: './order-list-item.component.html',
  styleUrl: './order-list-item.component.css'
})
export class OrderListItemComponent {
  @Input() orderItem!:  OrderItemModel;
  protected readonly parseFloat = parseFloat;
}
