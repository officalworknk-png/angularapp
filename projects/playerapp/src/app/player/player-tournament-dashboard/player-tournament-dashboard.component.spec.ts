import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerTournamentDashboardComponent } from './player-tournament-dashboard.component';

describe('PlayerTournamentDashboardComponent', () => {
  let component: PlayerTournamentDashboardComponent;
  let fixture: ComponentFixture<PlayerTournamentDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerTournamentDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerTournamentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
