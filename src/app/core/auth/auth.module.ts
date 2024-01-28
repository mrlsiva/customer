import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { CategoriesComponent } from './categories/categories.component';


@NgModule({
  declarations: [LoginComponent, RegisterComponent,
    ForgotPasswordComponent,
    CustomerLoginComponent,
    CategoriesComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ],
  exports: [
    LoginComponent
  ],
})
export class AuthModule { }
