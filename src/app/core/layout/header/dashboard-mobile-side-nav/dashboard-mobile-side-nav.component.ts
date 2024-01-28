import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CommonUtilsService } from 'src/app/core/services/helper/common-utils.service';
import { ComingSoonPopupComponent } from 'src/app/shared/components/coming-soon-popup/coming-soon-popup.component';

@Component({
  selector: 'qdo365-dashboard-mobile-side-nav',
  templateUrl: './dashboard-mobile-side-nav.component.html',
  styleUrls: ['./dashboard-mobile-side-nav.component.scss']
})
export class DashboardMobileSideNavComponent implements OnInit {
  @Input() dashboardSideMenuState: any;
  showSideNav: boolean = true;
  constructor(
    private siteNav: CommonUtilsService,
    private auth: AuthService,
    private route: Router,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    
    this.showSideNav = this.dashboardSideMenuState;
    
  }
close(){
      this.siteNav.siteNavtoggleclose();
    }
    
    openCommingSoon(nativagationType){
      const dialogRef = this.dialog.open(ComingSoonPopupComponent);
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
  
    logout(){
      this.auth.logout();
      this.siteNav.siteNavtoggleclose();
      this.route.navigateByUrl("./home");
    }
}
