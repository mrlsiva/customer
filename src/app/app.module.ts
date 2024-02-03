import { FlexLayoutModule } from '@angular/flex-layout';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './core/helper/error.interceptor';
import { GlobalErrorHandler } from './global-error-handler';
import { JwtInterceptor } from './core/helper/jwt.interceptor';
import { CommonLoggerService } from './core/services/logger/common-logger.service';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SharedModule } from './shared/shared.module';
import { CustomerHomeComponent } from './modules/customer/customer-home/customer-home.component';
@NgModule({
  declarations: [
    AppComponent,
    CustomerHomeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SlickCarouselModule,
    ToastrModule.forRoot(),
    FlexLayoutModule.withConfig({ addOrientationBps: false }),
    SharedModule
  ],
  providers: [
    CommonLoggerService,
    // { provide: APP_INITIALIZER, useFactory: tokenInitializer, multi: true, deps: [AuthService] },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
		{ provide: ErrorHandler, useClass: GlobalErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
