import {Component, OnInit} from '@angular/core';
import {ShowcaseSidebarComponent} from '../showcase-sidebar/showcase-sidebar.component';
import {ShowcaseBooksComponent} from '../showcase-books/showcase-books.component';
import {ActivatedRoute} from '@angular/router';
import {ShowcaseService} from '../showcase.service';

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
export class ShowcaseComponent implements OnInit {
  constructor(private route:ActivatedRoute, public showcaseService: ShowcaseService) {

  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.showcaseService.showcaseModel = data['showcase'];
    })


    }

}
