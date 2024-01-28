import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
	constructor(private auth: AuthService) {}

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		// add auth header with jwt if user is logged in and request is to the api url
		const userToken = this.auth.getAccessToken();
		const isLoggedIn = userToken && this.auth.isLoggedInStatus();
		const isApiUrl = request.url.startsWith(environment.BASE_URL);
		if (isLoggedIn && isApiUrl) {
      request = request.clone({
				setHeaders: { Authorization: `Bearer ${userToken}` },
			});
		}

		return next.handle(request);
	}
}
