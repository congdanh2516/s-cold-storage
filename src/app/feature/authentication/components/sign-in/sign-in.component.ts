import { Component } from '@angular/core';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
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

  signIn() { }

}
