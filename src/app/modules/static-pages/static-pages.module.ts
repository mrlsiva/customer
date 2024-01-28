import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaticPagesRoutingModule } from './static-pages-routing.module';
import { AboutUsComponent } from './about-us/about-us.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OurTeamComponent } from './our-team/our-team.component';
import { PricingPlansComponent } from './pricing-plans/pricing-plans.component';


@NgModule({
  declarations: [
    AboutUsComponent,
    OurTeamComponent,
    PricingPlansComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StaticPagesRoutingModule
  ]
})
export class StaticPagesModule { }
