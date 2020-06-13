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
interface SignedinResponse {
  authenticated: boolean;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com';
  // signedin$ will broadcast to whole app 
  signedin$ = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  usernameAvailable(username: string) {
    return this.http.post<UsernameAvailableResponse>(
      this.rootUrl + '/auth/username', {
            username // comes from api docs
        })
  }

  // {withCredentials: true} passed as an argument to .post() cancels the default behaviour of discarding cookies recieved
  // from the server during signin or signup.
  // this means our authentication checks will include the cookie and keep us signed in.
  // This solution was replaced with an Interceptor (ABootcamp2020 vid 302)
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

  checkAuth() {
    return this.http.get<SignedinResponse>(
      this.rootUrl + '/auth/signedin'
    ).pipe(
      tap(({authenticated}) => {
        console.log('authenticated: ', authenticated);
        // change signin status across the whole app
        this.signedin$.next(authenticated);
      })
    );
  }

  signout(){
    return this.http.post(`${this.rootUrl}/auth/signout`, {})
      .pipe(
        tap(()=>{
          this.signedin$.next(false);
        })
      );
  }
}
