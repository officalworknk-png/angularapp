import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './player/layout/error-page/error-page.component';


const routes: Routes = [

  
  
  {
    path: '',
    loadChildren: () => import('./player/player-dashboard.module').then(m => m.PlayerDashboardModule),
    // data: { preload: true, delay: false },
  },
  { path: '**',  component: ErrorPageComponent },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
