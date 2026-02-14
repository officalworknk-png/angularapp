/********** Component *********************/
import { PlayerDashboard } from './player-dashboard.component';
/********** Module *********************/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerDashboarRoutingModule } from './player-dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlayerDashboardComponent } from './player-dashboard/dashboard.component';
import { PlayerHeaderComponent } from './layout/player-header/header.component';
import { PlayerLoginComponent } from './layout/player-login/player-login.component';
import { PlayerSignupComponent } from './layout/player-signup/player-signup.component';
import { PlayerProfileComponent } from './player-profile/player-profile.component';
import { ValidationMessageModule } from '../validation-message/validation-message.module';
import { PlayerTournamentDashboardComponent } from './player-tournament-dashboard/player-tournament-dashboard.component';
import { PlayerTeamComponent } from './player-team/player-team.component';
import { PlayerTournamentInfoComponent } from './player-tournament-info/player-tournament-info.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PlayerBankingComponent } from './player-banking/player-banking.component';
import { PlayerAccountStatementComponent } from './player-account-statement/player-account-statement.component';


@NgModule({
    imports: [
        CommonModule,
        PlayerDashboarRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ValidationMessageModule,

    
    ],
    declarations: [
        PlayerDashboard,
        PlayerDashboardComponent,
        PlayerHeaderComponent,
        PlayerLoginComponent,
        PlayerSignupComponent,
        PlayerProfileComponent,
        PlayerTournamentDashboardComponent,
        PlayerTeamComponent,
        PlayerTournamentInfoComponent,
        ContactUsComponent,
        PlayerBankingComponent,
        PlayerAccountStatementComponent

    ],
    exports: [],
    providers: [
    ],

})
export class PlayerDashboardModule { }
