import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthApiService } from 'src/app/core/services/api/auth-api/auth-api.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { AuthDataService } from 'src/app/core/services/data/auth-data/auth-data.service';
import { CommonUtilsService } from 'src/app/core/services/helper/common-utils.service';
import { AppToastrService } from 'src/app/core/services/toastr/app-toastr.service';

@Component({
  selector: 'qdo365-dashboard-nav',
  templateUrl: './dashboard-nav.component.html',
  styleUrls: ['./dashboard-nav.component.scss']
})
export class DashboardNavComponent implements OnInit {

  userInfo: any;
  subscriptions: Subscription[] = [];
  requestInProgress: boolean = false;
  userId = null;
  constructor(
    private siteNav: CommonUtilsService,
    private authData: AuthDataService,
    private authApi: AuthApiService,
    private toast: AppToastrService,
    private authService: AuthService,
    private route: Router

  ) { }

  ngOnInit(): void {
    const usersInfo = this.authData.select('userInfo').subscribe(res=>{
      this.userInfo = res;
     });
    this.setSubscription(usersInfo);
    this.userInfo = this.authData.getUserProfileInfo();
    this.userId = this.userInfo.id;
    this.getUserInfo();

    const isRefresh  = this.authData.select('isRefresh').subscribe(res=>{
      if(res){
        this.getUserInfo();
        this.authData.setForceRefreshStatus(false);
      }
    });
    this.setSubscription(isRefresh);
  }
  toggleSidenav() {
    // alert("Hi");
    this.siteNav.siteNavtoggleStaus(true);
  }
  getDashboardInfo(){
    this.requestInProgress = true;
    const businessCategory = this.authApi.getDashboardInfo(this.userId).subscribe(
      {
        next: (res) => {
          this.requestInProgress = false;
          const { message, data } = res;
          this.userInfo = {...this.userInfo, ...data}
          // console.log(this.userInfo);
          this.authService.setUserInfo(this.userInfo);
        },
        error: (err) => {
          this.requestInProgress = false;
          // console.log(err);
          const { message, data } = err;
          this.toast.error(data?.title || message);
        },
      }
    )
    this.setSubscription(businessCategory);
  }

  getUserInfo() {
    this.requestInProgress = true;
    const businessCategory = this.authApi.getUserInfo(this.userId).subscribe(
      {
        next: (res) => {
          this.requestInProgress = false;
          const { message, data } = res;
          const userInfo = {...this.userInfo, ...data}
          this.authService.setUserInfo(userInfo);
          this.getDashboardInfo();
        },
        error: (err) => {
          this.requestInProgress = false;
          // console.log(err);
          const { message, data } = err;
          this.toast.error(data?.title || message);
        },
      }
    )
    this.setSubscription(businessCategory);
  }

  logout(){
    this.authService.logout();
    this.route.navigateByUrl("./home");
  }

  setSubscription(request: Subscription): void {
    this.subscriptions.push(request);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
