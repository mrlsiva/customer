import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { CategoriesComponent } from './categories/categories.component';
import { CreatePasswordComponent } from './create-password/create-password.component';
import { TellUsComponent } from './tell-us/tell-us.component';


@NgModule({
  declarations: [LoginComponent, RegisterComponent,
    ForgotPasswordComponent,
    CustomerLoginComponent,
    CategoriesComponent,
    CreatePasswordComponent,
    TellUsComponent],
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
