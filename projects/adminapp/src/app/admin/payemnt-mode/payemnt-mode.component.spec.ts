import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayemntModeComponent } from './payemnt-mode.component';

describe('PayemntModeComponent', () => {
  let component: PayemntModeComponent;
  let fixture: ComponentFixture<PayemntModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayemntModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayemntModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
