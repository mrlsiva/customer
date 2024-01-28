import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CommonUtilsService } from 'src/app/core/services/helper/common-utils.service';
import { LoaderService } from 'src/app/core/services/loader/loader.service';

@Component({
  selector: 'qdo365-main-site',
  templateUrl: './main-site.component.html',
  styleUrls: ['./main-site.component.scss'],
})
export class MainSiteComponent implements OnInit {
  sideMenuState:boolean = false;
  subscriptions: Subscription[] = [];

  dashboard: boolean = false;
  currentUrl : string = null;
  isPreRegister: boolean = false;
  isLoading$ = this.loaderService.isLoading$();

  constructor(
    private commonUtility: CommonUtilsService,
    private router: Router,
    private loaderService: LoaderService
  ) {
    const sideNave = this.commonUtility.sideNavToggleSubject.subscribe((res)=>{
			this.sideMenuState = this.commonUtility.sideNavStatus;
      // console.log(this.sideMenuState);
		});
    this.setSubscription(sideNave);
  }

  ngOnInit(): void {
    const currentUrl = window.location.href;
    let array =  currentUrl.split('/');
    this.isPreRegister = array.includes('payment') || array.includes('home');
    console.log(this.sideMenuState, this.isPreRegister);
  }

  navigator() {

   if (this.currentUrl == 'dashboard') {

      this.dashboard = true;
    } else {

      this.dashboard = false;
    }
  }

  setSubscription(request: Subscription): void {
    this.subscriptions.push(request);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

}
