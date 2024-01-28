import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if ([401, 403].includes(err.status)) {
          // auto logout if 401 or 403 response returned from api
          this.auth.logout();
          this.router.navigate(['/'], { fragment: 'home', queryParams: { returnUrl: window.location.href } });
          return throwError(() => { return { message: 'Session expired', data: null } });
        }

        if ([400, 409, 422, 404].includes(err.status)) {
          // console.log(err);
          const message = (err && err.error && err.error.error && err.error.error?.title) || err.statusText;
          const data = (err && err.error && err.error.error) || null;
          return throwError(() => { return { message, data } });
        }

        const message = (err && err.error && err.error.message) || (err.status == 503) ? 'Service unavailable. Please try again after sometime': err.statusText;
        const data = (err && err.error && err.error.data) || null;
        return throwError(() => { return { message, data } });
      })
    );
  }
}
