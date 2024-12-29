import {Component, Input} from '@angular/core';
import {ClientModel} from './client-item.model';

@Component({
  selector: 'app-client-item',
  standalone: true,
  imports: [],
  templateUrl: './client-item.component.html',
  styleUrl: './client-item.component.css'
})
export class ClientItemComponent {
  @Input() clientModel!: ClientModel;

}
