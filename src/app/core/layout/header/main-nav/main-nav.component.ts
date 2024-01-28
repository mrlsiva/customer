import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { CommonUtilsService } from 'src/app/core/services/helper/common-utils.service';

@Component({
  selector: 'qdo365-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent implements OnInit {
  // title = 'app';
  navWhite: boolean = false;
  showPopup: boolean = false;
  currentUrl : string = null;

  subscriptions: Subscription[] = [];
  constructor(private siteNav: CommonUtilsService, private router: Router, private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    const routeObs = this.router.events
		.pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
		.subscribe((event: NavigationEnd) => {
			if (event instanceof NavigationEnd) {
				const { url } = event;
				this.navWhite = url.includes("about-us");
			}
		});
		this.setSubscription(routeObs);

    // const currentUrl = window.location.href;
    // let array =  currentUrl.split('/');
    // this.currentUrl = array[array.length - 1];
    // this.navigator();
    // console.log(currentUrl.split('/'));
  }
  toggleSidenav() {
    this.siteNav.siteNavtoggleStaus(true);
  }
  // navigator() {
  //   if (this.currentUrl == 'about-us') {
  //     // alert('hi');
  //     this.navWhite = true;
  //   } else {
  //     this.navWhite = false;
  //   }
  // }
  togglePicker(event) {
    this.showPopup = event;
  }

  setSubscription(request: Subscription): void {
    this.subscriptions.push(request);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

}
