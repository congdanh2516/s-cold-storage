import { Component } from '@angular/core';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faChargingStation } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  faCircleUser = faCircleUser;
  faChargingStation = faChargingStation;
  faPencil=faPencil;
  faTrash=faTrash;
}
