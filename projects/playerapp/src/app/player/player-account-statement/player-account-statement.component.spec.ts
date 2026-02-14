import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerAccountStatementComponent } from './player-account-statement.component';

describe('PlayerAccountStatementComponent', () => {
  let component: PlayerAccountStatementComponent;
  let fixture: ComponentFixture<PlayerAccountStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerAccountStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerAccountStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
