import { Component } from '@angular/core';
import {PaginationComponent} from "../../../common/pagination/pagination.component";

@Component({
  selector: 'app-orders-info',
  standalone: true,
    imports: [
        PaginationComponent
    ],
  templateUrl: './orders-info.component.html',
  styleUrl: './orders-info.component.css'
})
export class OrdersInfoComponent {

}
