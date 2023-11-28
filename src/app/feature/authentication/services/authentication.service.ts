import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authToken: string = "";

  constructor(private httpClient: HttpClient) { }

  signIn(account: any) {
    let api: string = environment.url + "user/login";
    return this.httpClient.post(api, account)
      .pipe(
        tap((data) => {
          console.log("signIn: ", data);
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
