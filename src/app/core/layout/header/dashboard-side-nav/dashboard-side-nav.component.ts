import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ComingSoonPopupComponent } from 'src/app/shared/components/coming-soon-popup/coming-soon-popup.component';

@Component({
  selector: 'qdo365-dashboard-side-nav',
  templateUrl: './dashboard-side-nav.component.html',
  styleUrls: ['./dashboard-side-nav.component.scss']
})
export class DashboardSideNavComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private route: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  openCommingSoon(nativagationType){
    const dialogRef = this.dialog.open(ComingSoonPopupComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  logout(){
    this.auth.logout();
    this.route.navigateByUrl("./home");
  }

}
