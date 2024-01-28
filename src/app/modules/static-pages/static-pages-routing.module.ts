import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { OurTeamComponent } from './our-team/our-team.component';
import { PricingPlansComponent } from './pricing-plans/pricing-plans.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'about-us',
    pathMatch: 'full'
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
  },
  {
    path: 'our-team',
    component: OurTeamComponent,
  },
  {
    path: 'pricing-plans',
    component: PricingPlansComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaticPagesRoutingModule { }
