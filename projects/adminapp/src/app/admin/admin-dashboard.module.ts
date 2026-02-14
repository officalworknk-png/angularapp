import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboarRoutingModule } from './admin-dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationMessageModule } from '../validation-message/validation-message.module';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { MatchComponent } from './match/match.component';
import { TournamentDashboardComponent } from './tournament-dashboard/tournament-dashboard.component';
import { UpdateTournamentComponent } from './update-tournament/update-tournament.component';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { LoaderComponent } from './layout/loader/loader.component';
import { LoginComponent } from './layout/login/login.component';
import { UserDownlineComponent } from './user-downline/user-downline.component';
import { BonusComponent } from './bonus/bonus.component';
import { BankingComponent } from './banking/banking.component';
import { SignupPlayerComponent } from './signup-player/signup-player.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { DashboardBannerComponent } from './dashboard-banner/dashboard-banner.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { TransactionComponent } from './transaction/transaction.component';
import { PayemntModeComponent } from './payemnt-mode/payemnt-mode.component';


@NgModule({
    imports: [
        AdminDashboarRoutingModule,
        ReactiveFormsModule,
        ValidationMessageModule,
        FormsModule,
        CommonModule,

    ],
    declarations: [
        AdminDashboardComponent,
        LoaderComponent,
        LoginComponent,
        DashboardComponent,
        // HeaderComponent,
        TournamentDashboardComponent,
        // SidebarComponent,
        UpdateTournamentComponent,
        MatchComponent,
        UserDownlineComponent,
        BonusComponent,
        BankingComponent,
        SignupPlayerComponent,
        AnnouncementComponent,
        DashboardBannerComponent,
        UserInfoComponent,
        TransactionComponent,
        PayemntModeComponent,
    ],
    exports:[],
    providers : [
        
    ]
})
export class AdminDashboardModule {}
