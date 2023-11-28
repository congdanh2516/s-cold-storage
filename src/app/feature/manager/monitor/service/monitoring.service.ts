import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { AuthenticationService } from 'src/app/feature/authentication/services/authentication.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MonitoringService {

  url: string = "http://10.10.32.158:8111" //doi lai ip server va gate backend 

  constructor(private http: HttpClient, private authenticationSV: AuthenticationService) { }

  //ham tra ve danh sach mang nhiet do
  cubeSceneTemperatureList(idStorage: any) {
    let api = this.url + `/supervisor/storage_temperatures/faces/${idStorage}/`
    let header = new HttpHeaders()
      .set('Authorization', `Bear ${this.authenticationSV.authToken}`);
    return this.http.get(api, {headers: header})
            .pipe(
              tap((data) => {
                console.log("temperature list: ", data);
              }),
              catchError(this.handleError)
            )
  }

  signInIoT(account: any) {
    let api: string = environment.url + "";
    let header = new HttpHeaders()
      .set('Authorization', `Bear ${this.authenticationSV.authToken}`);
    return this.http.post(api, account, {headers: header})
            .pipe(
              tap((data) => {
                console.log("sign in IoT: ", data);
              }),
              catchError(this.handleError)
            )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
