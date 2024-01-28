import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainSiteComponent } from './template/main-site/main-site.component';
import { CustomerHomeComponent } from 'src/app/modules/customer/customer-home/customer-home.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerHomeComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../../modules/customer/customer.module').then(m => m.CustomerModule)
      },
      {
        path: '',
        loadChildren: () => import('../../modules/static-pages/static-pages.module').then(m => m.StaticPagesModule)
      },
    ]
  },
  
  {
    path: 'login',
    component: MainSiteComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule)

        // loadChildren: () => import('../../modules/customer/customer.module').then(m => m.CustomerModule)
      }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }