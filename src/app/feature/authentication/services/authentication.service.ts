import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

const httpOptions = {
  headers: new HttpHeaders({'Content-type' : 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authToken: string = "";

  constructor(private httpClient: HttpClient, private router: Router) { }

  signIn(account: any) {
    let api: string = environment.url + "users/login/";
    return this.httpClient.post(api, account, httpOptions)
      .pipe(
        tap((data: any) => {
          console.log("signIn: ", data);
          this.authToken = data.access;
          localStorage.setItem("authToken", data.access);
          // localStorage.setItem("owner", )
          this.router.navigateByUrl("/temperature-monitoring");
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
