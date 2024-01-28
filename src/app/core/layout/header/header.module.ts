import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainNavComponent } from './main-nav/main-nav.component';
import { RouterModule } from '@angular/router';
import { SideNavComponent } from './side-nav/side-nav.component';
import { DashboardNavComponent } from './dashboard-nav/dashboard-nav.component';
import { DashboardSideNavComponent } from './dashboard-side-nav/dashboard-side-nav.component';
import { DashboardMobileSideNavComponent } from './dashboard-mobile-side-nav/dashboard-mobile-side-nav.component';


@NgModule({
  declarations: [MainNavComponent, SideNavComponent, DashboardNavComponent, DashboardSideNavComponent, DashboardMobileSideNavComponent],
  imports: [
    CommonModule,
		RouterModule,
    SharedModule
	],
	exports:[
		MainNavComponent,
		SideNavComponent,
		DashboardNavComponent,
		DashboardSideNavComponent,
		DashboardMobileSideNavComponent
	],
})
export class HeaderModule { }
