import { Routes } from '@angular/router';
import {ShowcaseComponent} from './showcase/showcase/showcase.component';
import {ShowcaseBookComponent} from './showcase/showcase-book/showcase-book.component';
import {LogRegComponent} from './authentication/log-reg/log-reg.component';

export const routes: Routes = [
  {
    path: 'showcase',
    component: ShowcaseComponent,
    pathMatch: 'full'
  },
  {
    path: 'showcase/:showcaseId',
    component: ShowcaseBookComponent,
  },
  {
    path:'login',
    component:LogRegComponent
  },
  {
    path: '',
    redirectTo: '/showcase',
    pathMatch: 'full'
  },
];
