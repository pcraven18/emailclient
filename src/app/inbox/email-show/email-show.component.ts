import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { switchMap } from 'rxjs/operators';
// import { EmailService } from '../email.service';

import { Email } from '../email';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css']
})
export class EmailShowComponent implements OnInit {
  email: Email;

  constructor(
    private route: ActivatedRoute, // tells us everying going on inside the url. Accessed through an Observable or a Snapshot (ABootcamp2020 vid 327)
    // private emailService: EmailService
    ) { 
      // makes sure that our 'email' variable always has a value, even when the page is first loaded.
      this.route.data.subscribe(({email}) => {
        this.email = email;
      });
     }

    ngOnInit(): void {
// ***************************************************
// this commented code is is data fetching that has now been moved over to 
// a Resolver

      // console.log('route: ', this.route);
      //Access with url Observable:
      // this.route gives us BehaviorSubects that we can subscribe to...

      // this.route.params.subscribe(({ id }) =>{
      //   // params captures the parameter set up in our inbox-routing.module.ts
      //   this.emailService.getEmail(id).subscribe(email => {
      //     console.log(email);
      //   });
      // });


      // Access with url Snapshot:
      // console.log('ID: ', this.route.snapshot.params.id);
      // This only gives us a snapshot of the url when the user first navigates here,
      // if the user clicks a different email (a route with an identical structure) the id will not update

      // this.route.params.pipe(
      //   switchMap(({ id }) => {
      //     return this.emailService.getEmail(id);
      //   })
      // ).subscribe(email=> {
      //   // console.log('email: ', email);
      //   this.email = email;
      // })

// **************************************************

  }

}
