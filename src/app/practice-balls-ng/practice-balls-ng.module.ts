import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PracticeBallsNgPage } from './practice-balls-ng.page';

const routes: Routes = [
  {
    path: '',
    component: PracticeBallsNgPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PracticeBallsNgPage]
})
export class PracticeBallsNgPageModule {}
