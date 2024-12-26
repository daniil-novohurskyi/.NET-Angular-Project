import { Routes } from '@angular/router';
import {ShowcaseComponent} from './showcase/showcase/showcase.component';
import {ShowcaseBookComponent} from './showcase/showcase-book/showcase-book.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/showcase',
    pathMatch: 'full'
  },
  {
    path: 'showcase',
    component: ShowcaseComponent,
    pathMatch: 'full'
  },

  {
    path: 'showcase/:showcaseId',
    component: ShowcaseBookComponent,
  }
];
