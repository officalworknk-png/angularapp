/************************* Modules *********************************/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


/************************* Component  *********************************/

import { AdminDashboardComponent } from './admin-dashboard.component';
import { BankingComponent } from './banking/banking.component';
import { BonusComponent } from './bonus/bonus.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { LoginComponent } from './layout/login/login.component';
import { MatchComponent } from './match/match.component';
import { TournamentDashboardComponent } from './tournament-dashboard/tournament-dashboard.component';
import { UpdateTournamentComponent } from './update-tournament/update-tournament.component';
import { UserDownlineComponent } from './user-downline/user-downline.component';
import { AbstractGuard } from 'core/auth/AbstractGuard';
import { SignupPlayerComponent } from './signup-player/signup-player.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { DashboardBannerComponent } from './dashboard-banner/dashboard-banner.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { TransactionComponent } from './transaction/transaction.component';
import { PayemntModeComponent } from './payemnt-mode/payemnt-mode.component';




const routes: Routes = 

   
    [
      { path: '', component: LoginComponent, pathMatch: 'full' },
      { path: '',
        component: AdminDashboardComponent,
         canActivate: [AbstractGuard],
        
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'home',
        component: DashboardComponent,
      },
      {
        path: 'downline',
        component: UserDownlineComponent,
        canActivate: [AbstractGuard],
      },
      {
        path: 'userInfo/:id',
        component: UserInfoComponent,
        canActivate: [AbstractGuard],
      },
      {
        path: 'tournament',
        component: TournamentDashboardComponent,
        canActivate: [AbstractGuard],
      },
      {
        path: 'updatetrnmnt/:id',
        component: UpdateTournamentComponent,
        canActivate: [AbstractGuard],
      },

      {
        path: 'match',
        component: MatchComponent,
        canActivate: [AbstractGuard],
      },
      {
        path: 'banking',
        component: BankingComponent,
        canActivate: [AbstractGuard],
      },
      {
        path: 'bonus',
        component: BonusComponent,
        canActivate: [AbstractGuard],
      },
      {
        path: 'banner-management',
        component: DashboardBannerComponent,
        canActivate: [AbstractGuard],
      },
      {
        path: 'annoucement-management',
        component: AnnouncementComponent,
        canActivate: [AbstractGuard],
      },
      {
        path: 'signup-player',
        component: SignupPlayerComponent,
        canActivate: [AbstractGuard],
      },
      {
        path: 'transaction',
        component: TransactionComponent,
        canActivate: [AbstractGuard],
      },
      {
        path: 'payemnt-mode',
        component: PayemntModeComponent,
        canActivate: [AbstractGuard],
      },
    ]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboarRoutingModule { }
