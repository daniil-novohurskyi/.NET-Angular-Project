import { Routes } from '@angular/router';
import {ShowcaseComponent} from './showcase/showcase/showcase.component';
import {ShowcaseBookComponent} from './showcase/showcase-book/showcase-book.component';
import {LogRegComponent} from './authentication/log-reg/log-reg.component';
import {CartComponent} from './cart-order/cart/cart.component';
import {OrderComponent} from './cart-order/order/order.component';
import {UserProfileComponent} from './user/user-profile/user-profile.component';
import {UserEditComponent} from './user/user-edit/user-edit.component';
import {UsersInfoComponent} from './admin/users/users-info/users-info.component';
import {BooksInfoComponent} from './admin/books/books-info/books-info.component';
import {OrdersInfoComponent} from './admin/orders/orders-info/orders-info.component';

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
  },
  {
    path:'login',
    component:LogRegComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'order',
    component: OrderComponent
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    pathMatch: 'full'
  },
  {
    path: 'profile/edit',
    component:UserEditComponent
  },
  {
    path: 'admin/users',
    component:UsersInfoComponent
  },
  {
    path: 'admin/books',
    component:BooksInfoComponent
  },
  {
    path: 'admin/orders',
    component:OrdersInfoComponent
  }

];
