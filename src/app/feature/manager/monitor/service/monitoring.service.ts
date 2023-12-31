import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { AuthenticationService } from 'src/app/feature/authentication/services/authentication.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MonitoringService {

  // url: string = "http://10.10.32.158:8111"

  constructor(private http: HttpClient, private authenticationSV: AuthenticationService) { }

  //ham tra ve danh sach mang nhiet do
  cubeSceneTemperatureList(idStorage: any) {
    let api = environment.url + `supervisor/storage_temperatures/faces/${idStorage}/`;
    let authToken = localStorage.getItem("authToken");
    let header = new HttpHeaders()
      .set('Authorization', `Bearer ${authToken}`);
    return this.http.get(api, {headers: header})
            .pipe(
              tap((data) => {
                console.log("temperature list: ", data);
              }),
              catchError(this.handleError)
            )
  }

  getStorageInfo(idStorage: any) {
    let api: string = environment.url +  `owner/storages/${idStorage}/`;
    let authToken = localStorage.getItem("authToken");
    let header = new HttpHeaders()
      .set('Authorization', `Bearer ${authToken}`);
    return this.http.get(api, {headers: header});
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

  getListSensor(idStorage: any) {
    let api = environment.url + `/owner/sensors/?sensor_storage__id=${idStorage}`;
    let header = new HttpHeaders()
      .set('Authorization', `Bear ${this.authenticationSV.authToken}`);
    return this.http.get(api, {headers: header})
      .pipe(
        tap((data: any) => {
          
        }),
        catchError(this.handleError)
      );
  }

  checkLoginIoTLab(idStorage: any) {  //mang rong => chua dang nhap
    let api = environment.url + `/api/stations/?station_storage__id=${idStorage}`;
    let header = new HttpHeaders()
      .set('Authorization', `Bear ${this.authenticationSV.authToken}`);
    return this.http.get(api);
  }

  updateConnectIot(idStation: any, account: any) {
    let api = environment.url + `/api/stations/${idStation}/`;
    let header = new HttpHeaders()
      .set('Authorization', `Bear ${this.authenticationSV.authToken}`);
    return this.http.put(api, account);
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
