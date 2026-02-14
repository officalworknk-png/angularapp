import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PlayerDashboard } from './player-dashboard.component';
import { PlayerDashboardComponent } from './player-dashboard/dashboard.component';
import { PlayerProfileComponent } from './player-profile/player-profile.component';
import { PlayerTeamComponent } from './player-team/player-team.component';
import { PlayerTournamentDashboardComponent } from './player-tournament-dashboard/player-tournament-dashboard.component';
import { PlayerTournamentInfoComponent } from './player-tournament-info/player-tournament-info.component';
import { PlayerBankingComponent } from './player-banking/player-banking.component';
import { PlayerAccountStatementComponent } from './player-account-statement/player-account-statement.component';


const routes: Routes = [
    {
        path: '',
        component: PlayerDashboard,
        children: [
            { path: '', component: PlayerDashboardComponent, pathMatch: 'full'},
            {
                path: 'tournament',
                component: PlayerTournamentDashboardComponent
            },
            {
                path: 'tournamentdata/:id',
                component: PlayerTournamentInfoComponent
            },
            {
                path: 'team',
                component: PlayerTeamComponent
            },
            {
                path: 'contact-us',
                component: ContactUsComponent
            },
            {
                path: 'profile',
                component: PlayerProfileComponent
            },
            {
                path: 'coin-transfer',
                component: PlayerBankingComponent
            },
            {
                path: 'account-statement',
                component: PlayerAccountStatementComponent
            },
            
           
        ]
       
    },
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlayerDashboarRoutingModule {}
