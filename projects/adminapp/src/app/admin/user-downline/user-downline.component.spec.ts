import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDownlineComponent } from './user-downline.component';

describe('UserDownlineComponent', () => {
  let component: UserDownlineComponent;
  let fixture: ComponentFixture<UserDownlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDownlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDownlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
