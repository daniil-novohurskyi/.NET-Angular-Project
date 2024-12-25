import { Component } from '@angular/core';
import {ShowcaseSidebarComponent} from '../showcase-sidebar/showcase-sidebar.component';
import {ShowcaseBooksComponent} from '../showcase-books/showcase-books.component';

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [
    ShowcaseSidebarComponent,
    ShowcaseBooksComponent
  ],
  templateUrl: './showcase.component.html',
  styleUrl: './showcase.component.css'
})
export class ShowcaseComponent {
}
