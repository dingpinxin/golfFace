import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PracticeBallsStartPage } from './practice-balls-start.page';

const routes: Routes = [
  {
    path: '',
    component: PracticeBallsStartPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PracticeBallsStartPage]
})
export class PracticeBallsStartPageModule {}
