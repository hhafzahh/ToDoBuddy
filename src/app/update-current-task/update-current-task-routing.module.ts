import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateCurrentTaskPage } from './update-current-task.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateCurrentTaskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateCurrentTaskPageRoutingModule {}
