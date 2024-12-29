import {Component, Input} from '@angular/core';
import {OrderListItemModel} from './order-list-item.model';

@Component({
  selector: 'app-order-list-item',
  standalone: true,
  imports: [],
  templateUrl: './order-list-item.component.html',
  styleUrl: './order-list-item.component.css'
})
export class OrderListItemComponent {
  @Input() orderItem!: OrderListItemModel;
  protected readonly parseFloat = parseFloat;
}
