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
interface SigninCredentials {
  username: string;
  password: string;
}

interface SigninResponse {
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com';
  // signedin$ will broadcast to whole app 
  signedin$ = new BehaviorSubject(null);
  username = '';

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
          tap((response)=> {
            // if there is an error in signing up the tap() will be skipped
            this.signedin$.next(true);
            this.username = response.username;
          })
        );
  };

  checkAuth() {
    return this.http.get<SignedinResponse>(
      this.rootUrl + '/auth/signedin'
    ).pipe(
      // authenticated is recognised because we used an interface.
      tap(({authenticated, username}) => {
        // console.log('authenticated: ', authenticated);
        // change signin status across the whole app
        this.signedin$.next(authenticated);
        this.username = username;
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

  signin(credentials: SigninCredentials) {
    // if post request is unsuccessful (user entered wrone data) it will return
    // an error. This error will not enter the pipe and 
    // user will not be sisned in.
    return this.http.post<SigninResponse>(`${this.rootUrl}/auth/signin`, credentials)
      .pipe(
        tap((response)=> {
          this.signedin$.next(true);
          this.username = response.username;
        })
      );
  }
}
