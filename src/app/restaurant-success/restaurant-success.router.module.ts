import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantSuccessPage } from './restaurant-success.page';

const routes: Routes = [
    {
      path: 'restaurant-success',
      component: RestaurantSuccessPage,
      children: [
        {
          path: 'restaurant-menu',
          children: [
            {
              path: '',
              loadChildren: () =>
              import('../restaurant-menu/restaurant-menu.module').then(m => m.RestaurantMenuPageModule)
            }
          ]
        },
        {
          path: 'restaurant-order',
          children: [
            {
              path: '',
              loadChildren: () =>
              import('../restaurant-order/restaurant-order.module').then(m => m.RestaurantOrderPageModule)
            }
          ]
        },
        {
          path: '/restaurant-success/restaurant-menu',
          redirectTo: '/restaurant-success/restaurant-menu',
          pathMatch: 'full'
        }
      ]
    },
    {
      path: '/restaurant-success/restaurant-menu',
      redirectTo: '/restaurant-success/restaurant-menu',
      pathMatch: 'full'
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
