import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/internal/operators';

export class LoggingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
    return handler.handle(req).pipe(
      tap(
        (event) => {
          console.log('logging.interceptor_LoggingInterceptor........ ', event);
        }
      )
    );

    /*
      tap - sort of 'subscribe' the Observable without consuming it. If using normal 'subscribe', the Observable will be consumed.
      Use 'tap' if you do not want to consume the Observable, just merely additional step in the observable.
    */
  }
}
