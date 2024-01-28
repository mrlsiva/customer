import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfileVerifyComponent } from 'src/app/shared/components/profile-verify/profile-verify.component';

@Injectable({
  providedIn: 'root'
})
export class CommonUtilsService {
  sideNavStatus: boolean = false;
  public sideNavToggleSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private auth: AuthService,
    private dialog: MatDialog,
    ) { }

  siteNavtoggleclose() {
    this.sideNavStatus = false;
    this.sideNavToggleSubject.next(null);
  }

  siteNavtoggleStaus(status:boolean) {
    this.sideNavStatus = status;
    this.sideNavToggleSubject.next(null);
  }

  openVerificationPopup(name: string, type: string, content: string = null, callFromPage: string = null, showAlways=false): Observable<any> {
    return new Observable((observer) => {
      if (this.auth.isLoggedInStatus() && this.auth.isProfileVerified()) {
        observer.next(true);
        observer.complete();
        return;
      }
      const dialogRef = this.dialog.open(ProfileVerifyComponent, {
        disableClose: true,
        data: {
          name, type, content,
          entity_type: name,
        }
      });

      dialogRef.afterClosed().subscribe((value) => {
        observer.next(value);
        observer.complete();
      })
    });
  }


}
