import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimerPageRoutingModule } from './timer-routing.module';

import { TimerPage } from './timer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
   TimerPageRoutingModule,
   ReactiveFormsModule
  ],
  declarations: [TimerPage]
})
export class TimerPageModule {}
