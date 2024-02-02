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
    TicketHotDealsComponent
  ]
})
export class ComponentsModule { }
