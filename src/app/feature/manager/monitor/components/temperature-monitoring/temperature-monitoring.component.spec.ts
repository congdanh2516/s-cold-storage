import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureMonitoringComponent } from './temperature-monitoring.component';

describe('TemperatureMonitoringComponent', () => {
  let component: TemperatureMonitoringComponent;
  let fixture: ComponentFixture<TemperatureMonitoringComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemperatureMonitoringComponent]
    });
    fixture = TestBed.createComponent(TemperatureMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
