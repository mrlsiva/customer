import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerHomeComponent } from '../customer/customer-home/customer-home.component';
import { PostLoginHomeComponent } from './post-login-home/post-login-home.component';
import { MyOfferComponent } from './my-offer/my-offer.component';


const routes: Routes = [
  {
    path: '',
    component: CustomerHomeComponent,
  },
  {
    path: 'home',
    component: PostLoginHomeComponent,
  },
  {
    path: 'my-offer',
    component: MyOfferComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
