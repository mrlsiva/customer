import { AuthService } from './../services/auth/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { CommonUtilsService } from '../services/helper/common-utils.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfileVerifyComponent } from 'src/app/shared/components/profile-verify/profile-verify.component';

@Injectable({
  providedIn: 'root'
})
export class ProfileVerifyGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private commonUtils: CommonUtilsService, private dialog: MatDialog){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authService.isLoggedInStatus() && this.authService.isProfileVerified()) {
				return true;
			}

      // const confirmResult = confirm('You are not authorized to access this page. Do you want to go back?');
      const dialogRef = this.dialog.open(ProfileVerifyComponent);

      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.router.navigate(['/dashboard/home']);
        }
      });
      return false;
  }

}
