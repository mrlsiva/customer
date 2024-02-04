import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { SpinnerComponent } from './loader/spinner/spinner.component';
import { ToastrComponent } from './toastr/toastr.component';
import { MaterialModule } from '../material.module';
import { PipesModule } from '../pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../directives/directives.module';
import { ComingSoonPopupComponent } from './coming-soon-popup/coming-soon-popup.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProfileVerifyComponent } from './profile-verify/profile-verify.component';
import { TermsComponent } from './terms/terms.component';
import { ReadLetterComponent } from './read-letter/read-letter.component';
import { PaymentTermComponent } from './payment-term/payment-term.component';
import { PaymentTermsComponent } from './payment-terms/payment-terms.component';
import { TicketHotDealsComponent } from './ticket-hot-deals/ticket-hot-deals.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductQuickCardComponent } from './product-quick-card/product-quick-card.component';
import { LocationComponent } from './location/location.component';
import { MoreBrandsComponent } from './more-brands/more-brands.component';
import { ExclusiveOfferComponent } from './exclusive-offer/exclusive-offer.component';



@NgModule({
  declarations: [
    ToastrComponent,
    AlertDialogComponent,
    SpinnerComponent,
    ComingSoonPopupComponent,
    PaymentMethodComponent,
    ProfileVerifyComponent,
    TermsComponent,
    ReadLetterComponent,
    PaymentTermComponent,
    PaymentTermsComponent,
    TicketHotDealsComponent,
    ProductCardComponent,
    ProductQuickCardComponent,
    LocationComponent,
    MoreBrandsComponent,
    ExclusiveOfferComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule
  ],
  exports: [
    ToastrComponent,
    AlertDialogComponent,
    SpinnerComponent,
    ComingSoonPopupComponent,
    PaymentMethodComponent,
    ProfileVerifyComponent,
    TermsComponent,
    ReadLetterComponent,
    PaymentTermComponent,
    TicketHotDealsComponent,
    ProductCardComponent,
    ProductQuickCardComponent,
    LocationComponent,
    MoreBrandsComponent,
    ExclusiveOfferComponent
  ]
})
export class ComponentsModule { }
