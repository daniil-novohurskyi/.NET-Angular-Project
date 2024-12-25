import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NavigationComponent} from './common/navigation/navigation.component';
import {FooterComponent} from './common/footer/footer.component';
import {ShowcaseComponent} from './showcase/showcase/showcase.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FontAwesomeModule,
    NavigationComponent,
    FooterComponent,
    ShowcaseComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Tin_Frontend';
}
