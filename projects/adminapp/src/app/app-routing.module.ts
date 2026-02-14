import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './admin/layout/error-page/error-page.component';
import { AbstractGuard } from 'core/auth/AbstractGuard';


const routes: Routes = [

  
  
  // {
  //   path: '',
  //   loadChildren: () => import('./player/player-dashboard.module').then(m => m.PlayerDashboardModule),
  //   // data: { preload: true, delay: false },
  // },
  {
    path: '',
    loadChildren: () => import('./admin/admin-dashboard.module').then(m => m.AdminDashboardModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin-dashboard.module').then(m => m.AdminDashboardModule),
    canActivate: [AbstractGuard],
  },
  { path: '**',  component: ErrorPageComponent },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
