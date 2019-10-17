import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PracticeBallsSuccessPage } from './practice-balls-success.page';

const routes: Routes = [
  {
    path: '',
    component: PracticeBallsSuccessPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PracticeBallsSuccessPage]
})
export class PracticeBallsSuccessPageModule {}
