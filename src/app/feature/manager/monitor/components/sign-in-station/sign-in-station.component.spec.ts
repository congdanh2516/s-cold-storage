import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInStationComponent } from './sign-in-station.component';

describe('SignInStationComponent', () => {
  let component: SignInStationComponent;
  let fixture: ComponentFixture<SignInStationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignInStationComponent]
    });
    fixture = TestBed.createComponent(SignInStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
