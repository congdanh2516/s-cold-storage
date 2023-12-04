import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faUser, faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { MonitoringService } from '../../service/monitoring.service';

@Component({
  selector: 'app-sign-in-station',
  templateUrl: './sign-in-station.component.html',
  styleUrls: ['./sign-in-station.component.scss']
})
export class SignInStationComponent {

  faUser = faUser;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  hiddenPassword: boolean = true;
  signInForm: FormGroup;
  
  constructor(private fb: FormBuilder, private monitoringSV: MonitoringService) {
    this.signInForm = this.fb.group({
      station_username: ['', [Validators.required]],
      station_password: ['', [Validators.required]],
      station_storage_id: ['']
    })
  }

  signIn() {
  }
}
