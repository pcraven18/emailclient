import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  signedin$: BehaviorSubject<boolean>;

  constructor(private authService: AuthService) {
    this.signedin$ = this.authService.signedin$;

  }

  ngOnInit() {
    // recieve a boolean from authService and update boolean here.
    // this method used with a boolean variable declared above called 'signedin'
    // alternate to method used in this constructor.

    // this.authService.signedin$.subscribe((signedin)=> {
    //   this.signedin = signedin;
    // })

    this.authService.checkAuth().subscribe(()=>{});
  }
}
