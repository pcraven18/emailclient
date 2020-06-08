import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncValidator, FormControl } from '@angular/forms';

// below marks the UniqueUsername class as using the Ingectable decorator.
// this enables the UniqueUsername class to use the Dependancy Injection system (ABootcamp2020 vid 278)
@Injectable({ 
    providedIn: 'root'
})

export class UniqueUsername implements AsyncValidator{
    constructor(private http: HttpClient) { }

    // arrow function used below so that 'this' is not undefined.
    // context of function is now 'bound' to the UniqueUsername class 
    // ABootcamp2020 vid 279
    validate = (control: FormControl) => {
        const { value } = control;
        
        console.log(this.http);

        return null;
    }
}
