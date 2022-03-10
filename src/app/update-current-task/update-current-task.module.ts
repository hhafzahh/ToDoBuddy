import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateCurrentTaskPageRoutingModule } from './update-current-task-routing.module';

import { UpdateCurrentTaskPage } from './update-current-task.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateCurrentTaskPageRoutingModule
  ],
  declarations: [UpdateCurrentTaskPage]
})
export class UpdateCurrentTaskPageModule {}
