import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PostLoginHomeComponent } from './post-login-home/post-login-home.component';
import { MyOfferComponent } from './my-offer/my-offer.component';



@NgModule({
  declarations: [
    PostLoginHomeComponent,
    MyOfferComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule
  ]
})
export class CustomerModule { }
