import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faUser, faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

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
  
  constructor(private fb: FormBuilder) {
    this.signInForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  signIn() {}
}
