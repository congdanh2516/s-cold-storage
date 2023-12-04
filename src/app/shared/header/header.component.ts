import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faChargingStation } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() usernameIoT: string = '';

  faCircleUser = faCircleUser;
  faChargingStation = faChargingStation;
  faPencil=faPencil;
  faTrash=faTrash;
  faArrowRightFromBracket = faArrowRightFromBracket;

  signOutDialogOpening: boolean;
  signOutDialogOpeningTimeOut: any;

  constructor(private router: Router) {}

  openSignOutDialog() {
    this.closeSignOutDialogTimeOutOnHover();
    this.signOutDialogOpening === undefined ? this.signOutDialogOpening = true : this.signOutDialogOpening = !this.signOutDialogOpening;
    this.setSignOutDialogTimeOut();
  }

  closeSignOutDialogTimeOutOnHover() {
    clearTimeout(this.signOutDialogOpeningTimeOut);
  }

  setSignOutDialogTimeOut() {
    this.signOutDialogOpeningTimeOut = setTimeout(() => {
      this.signOutDialogOpening = false;
    }, 3000)
  }

  logOut() {
    this.router.navigateByUrl('/sign-in');
  }
  
}
