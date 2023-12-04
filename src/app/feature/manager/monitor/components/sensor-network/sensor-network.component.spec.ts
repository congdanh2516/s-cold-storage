import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorNetworkComponent } from './sensor-network.component';

describe('SensorNetworkComponent', () => {
  let component: SensorNetworkComponent;
  let fixture: ComponentFixture<SensorNetworkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SensorNetworkComponent]
    });
    fixture = TestBed.createComponent(SensorNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
