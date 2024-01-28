import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

// import { Logger } from '../logger.service';
// import { CredentialsService } from './credentials.service';

// const log = new Logger('AuthenticationGuard');

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedInStatus()) {
      return true;
    }

    // log.debug('Not authenticated, redirecting and adding redirect url...');
    this.router.navigate(['/home'], { queryParams: { redirect: state.url }, replaceUrl: true });
    return false;
  }
}
