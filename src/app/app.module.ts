import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemperatureMonitoringComponent } from './feature/manager/monitor/components/temperature-monitoring/temperature-monitoring.component';
import { HeaderComponent } from './shared/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ErrorMessageComponent } from './shared/error-message/error-message.component';
import { SignInComponent } from './feature/authentication/components/sign-in/sign-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignInStationComponent } from './feature/manager/monitor/components/sign-in-station/sign-in-station.component';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SensorNetworkComponent } from './feature/manager/monitor/components/sensor-network/sensor-network.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    TemperatureMonitoringComponent,
    HeaderComponent,
    ErrorMessageComponent,
    SignInComponent,
    SignInStationComponent,
    SensorNetworkComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    ErrorMessageComponent
  ]
})
export class AppModule { }
