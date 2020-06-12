import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface UsernameAvailableResponse {
  available: boolean;
}  
interface SignupCredentials {
  username: string,
  password: string,
  passwordConfirmation: string;
}
interface SignupResponse {
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com';
  signedin$ = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  usernameAvailable(username: string) {
    return this.http.post<UsernameAvailableResponse>(
      this.rootUrl + '/auth/username', {
            username // comes from api docs
        })
  }

  signup(credentials: SignupCredentials) {
    return this.http.post<SignupResponse>(
      this.rootUrl + '/auth/signup',
        credentials
      ).pipe(
          tap(()=> {
            // if there is an error in signing up the tap() will be skipped
            this.signedin$.next(true);
          })
        );
  };
}
