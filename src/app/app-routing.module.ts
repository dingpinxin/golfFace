import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'user-menu', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'user-info-input', loadChildren: './user-info-input/user-info-input.module#UserInfoInputPageModule' },
  { path: 'check-in', loadChildren: './check-in/check-in.module#CheckInPageModule' },
  { path: 'check-in-success', loadChildren: './check-in-success/check-in-success.module#CheckInSuccessPageModule' },
  { path: 'user-menu', loadChildren: './user-menu/user-menu.module#UserMenuPageModule' },
  { path: 'practice-balls-start', loadChildren: './practice-balls-start/practice-balls-start.module#PracticeBallsStartPageModule' },
  { path: 'practice-balls-success', loadChildren: './practice-balls-success/practice-balls-success.module#PracticeBallsSuccessPageModule' },
  { path: 'check-in-ng', loadChildren: './check-in-ng/check-in-ng.module#CheckInNgPageModule' },
  { path: 'practice-balls-buy', loadChildren: './practice-balls-buy/practice-balls-buy.module#PracticeBallsBuyPageModule' },
  { path: 'practice-balls-ng', loadChildren: './practice-balls-ng/practice-balls-ng.module#PracticeBallsNgPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
