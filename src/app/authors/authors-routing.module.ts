import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorsPage } from './authors.page';

const routes: Routes = [
  {
    path: '',
    component: AuthorsPage
  },
  {
    //name as parameter in the route.
    path: 'detail/:name',
    loadChildren: () => import('./detail/detail.module').then( m => m.DetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorsPageRoutingModule {}
