import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, skipWhile, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(
      private authService: AuthService,
      private router: Router
    ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.signedin$.pipe(
      skipWhile(value => value === null), // ignore any value of null
      take(1),  // trick a subscriber into thinking that the observable is 'complete()' once this recieves a value (ABootcamp2020 316)
      tap((authenticated)=> {
        if(!authenticated) {
          this.router.navigateByUrl('/');
        }
      })
    );
  }
}
