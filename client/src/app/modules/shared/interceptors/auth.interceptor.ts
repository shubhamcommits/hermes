import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private _Router: Router) { }

  /**
   * Custom Interceptor which intercepts request to add authorization header
   * Note:- To skip the request to add the header, make use of HTTP Backend
   * @param request 
   * @param next 
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authService.isLoggedIn()) {
      const tokenizedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token') || '')}`
        }
      })
      return next.handle(tokenizedRequest)
        .pipe(tap(() => { },
          async (err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status !== 401) {
                return;
              }
              this.authService.signout()
              localStorage.clear()
              sessionStorage.clear()
              this._Router.navigate(['/home', 'login'])
            }
          }))
    }
    return next.handle(request.clone())

  }
}