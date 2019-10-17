import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PracticeBallsBuyPage } from './practice-balls-buy.page';

const routes: Routes = [
  {
    path: '',
    component: PracticeBallsBuyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PracticeBallsBuyPage]
})
export class PracticeBallsBuyPageModule {}
