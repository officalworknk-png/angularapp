import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerTournamentInfoComponent } from './player-tournament-info.component';

describe('PlayerTournamentInfoComponent', () => {
  let component: PlayerTournamentInfoComponent;
  let fixture: ComponentFixture<PlayerTournamentInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerTournamentInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerTournamentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
