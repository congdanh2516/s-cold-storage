import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemperatureMonitoringComponent } from './feature/manager/monitor/components/temperature-monitoring/temperature-monitoring.component';
import { SignInComponent } from './feature/authentication/components/sign-in/sign-in.component';
import { SignInStationComponent } from './feature/manager/monitor/components/sign-in-station/sign-in-station.component';
import { SensorNetworkComponent } from './feature/manager/monitor/components/sensor-network/sensor-network.component';

const routes: Routes = [
  {path: 'temperature-monitoring', component: TemperatureMonitoringComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-in-station', component: SignInStationComponent},
  {path: "sensor-network", component: SensorNetworkComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
