import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestaurantSuccessPage } from './restaurant-success.page';

import { TabsPageRoutingModule } from './restaurant-success.router.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule
  ],
  declarations: [RestaurantSuccessPage]
})
export class RestaurantSuccessPageModule {}
