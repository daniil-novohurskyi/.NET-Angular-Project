import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {OrderListItemComponent} from '../../../cart-order/order/order-list-item/order-list-item.component';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {OrderUpsertModel} from '../../../models/orders/order-upsert.model';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [
    NgForOf,
    OrderListItemComponent,
    ReactiveFormsModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent implements OnInit {
  public orderUpsertModel: OrderUpsertModel={
    client: {email: '', id: 0, name: ''},
    deliveryDetails: {city: '', name: '', phone: '', postalCode: '', street: '', unit: 0},
    orderDetails: {date: '', id: '', status: '', totalPrice: 0},
    orderItems:[]
  };

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
        this.route.data.subscribe(data=>{
          this.orderUpsertModel = data['orderDetails'];
        })
    }
}
