import { Injectable } from '@angular/core';
import { AsyncValidator, FormControl } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { AuthService } from '../auth.service';

// below marks the UniqueUsername class as using the Ingectable decorator.
// this enables the UniqueUsername class to use the Dependancy Injection system (ABootcamp2020 vid 278)
@Injectable({ 
    providedIn: 'root'
})

export class UniqueUsername implements AsyncValidator{
    constructor(private authService: AuthService) { }

    // arrow function used below so that 'this' is not undefined.
    // context of function is now 'bound' to the UniqueUsername class 
    // ABootcamp2020 vid 279
    validate = (control: FormControl) => {
        const { value } = control;
        

        // Async validator should return an OBSERVABLE or a promise.
        // If an error is emmited it must be caught otherwise it will skip over some
        // operators in the pipe and be emmitted as an error object instead of an observable.
        return this.authService.usernameAvailable(value)
        .pipe(
            map((value)=> {
                if (value.available){
                    return null; // the only way we end up in this map() is if the request was succesful. so just return null
                }
            }),
            catchError((err) => {
                console.log(err);
                if (err.error.username) {
                    // of() is a shortcut for creating a new observable. 
                    return of({ nonUniqueUsername: true })
                } else {
                    return of({ noConnection: true });
                }
            })
        );
    };
}
