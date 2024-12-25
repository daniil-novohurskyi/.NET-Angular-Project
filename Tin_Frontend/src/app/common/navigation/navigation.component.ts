import { Component } from '@angular/core';
import {faCoffee} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {

  protected readonly faCoffee = faCoffee;
}
