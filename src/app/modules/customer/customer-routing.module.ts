import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerHomeComponent } from '../customer/customer-home/customer-home.component';
import { PostLoginHomeComponent } from './post-login-home/post-login-home.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerHomeComponent,
  },
  {
    path: 'home',
    component: PostLoginHomeComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
