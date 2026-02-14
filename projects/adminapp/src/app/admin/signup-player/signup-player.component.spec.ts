import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupPlayerComponent } from './signup-player.component';

describe('SignupPlayerComponent', () => {
  let component: SignupPlayerComponent;
  let fixture: ComponentFixture<SignupPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
