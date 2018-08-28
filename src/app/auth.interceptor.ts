import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {Observable} from 'rxjs';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
    console.log('auth.interceptor_intercept!!!!!');

    /* set to overwrite headers from the intercepted request, append to append headers from the intercepted request */
    // const copiedReq = req.clone({headers: req.headers.set('someHeadersName', 'blablablabla')});
    // const copiedReq = req.clone({headers: req.headers.append('someHeadersName', 'blablablabla')});

    const copiedReq = req.clone({params: req.params.set('auth', this.authService.getToken())});

    return handler.handle(copiedReq);   // if return null, HttpRequest will not proceed, it will fail
  }
}
