import { Component } from '@angular/core';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { AuthenticationService } from '../../services/authentication.service';


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

  constructor(private fb: FormBuilder, private authenticationSv: AuthenticationService) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  signIn() { 
    console.log("BC: ", this.signInForm.value);
    this.authenticationSv.signIn(this.signInForm.value).subscribe({
      next: (data) => {
        console.log("sign in component: ", data);
      },
      error: (error) => {
        console.log("error: ", error);
      }
    })
  }

}
