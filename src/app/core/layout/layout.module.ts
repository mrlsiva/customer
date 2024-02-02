import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { MainSiteComponent } from './template/main-site/main-site.component';
import { HeaderModule } from './header/header.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FooterComponent } from './footer/footer.component';
import { LandingSiteComponent } from './template/landing-site/landing-site.component';



@NgModule({
  declarations: [
    
    MainSiteComponent,
    FooterComponent,
    LandingSiteComponent,
    
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    HeaderModule,
    SharedModule
  ]
})
export class LayoutModule { }
