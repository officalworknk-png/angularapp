import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerBankingComponent } from './player-banking.component';

describe('PlayerBankingComponent', () => {
  let component: PlayerBankingComponent;
  let fixture: ComponentFixture<PlayerBankingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerBankingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerBankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
