import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpEventType
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor{
    // ABootcamp 2020 (vid 301) - for more on Interceptors
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // console.log(req);
        //HERE is where we modify or log the outgoing request

        // req is Read Only...
        // modifiedReq disregards old req and makes sure changes reach
        // the next.handle()
        const modifiedReq = req.clone({
            withCredentials: true
        });

        return next.handle(modifiedReq)
        .pipe(
            // tap (val => {
            //     // console.log(val); // view status info from next.handle() observable
            //     if (val.type === HttpEventType.Sent){
            //         console.log('Request was sent to server');
            //     }
            //     // http.d.ts for a full list of HttpEventTypes
            //     if (val.type === HttpEventType.Response) {
            //         console.log('Got a response from the API', val);
            //     }
            // })
        );
    }
}
