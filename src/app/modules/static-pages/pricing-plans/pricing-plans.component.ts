import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { PlanApiService } from 'src/app/core/services/api/plan-api/plan-api.service';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { PaymentTermComponent } from 'src/app/shared/components/payment-term/payment-term.component';

@Component({
  selector: 'qdo365-pricing-plans',
  templateUrl: './pricing-plans.component.html',
  styleUrls: ['./pricing-plans.component.scss']
})
export class PricingPlansComponent implements OnInit {

  subscriptions: Subscription[] = [];
  requestInProgress: boolean = false;
  planList = [];
  constructor(
    public dialog: MatDialog,
    private loaderService: LoaderService,
    private planApi: PlanApiService,
    ) { }

  openDialog() {
    const dialogRef = this.dialog.open(PaymentTermComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  ngOnInit(): void {
    this.getPlanList();
  }

  getPlanList(){
    this.loaderService.showLoader({
      text: 'Fetching plans...',
      fullscreen: true,
    });
    this.requestInProgress = true;
    const businessCategory = this.planApi.getPlans().subscribe(
      {
        next: (res) => {
          // console.log(res);
          const { message, data } = res;
          this.planList = data;
          // console.log(this.planList);
          this.requestInProgress = false;
          this.loaderService.hideLoader();
          // this.toast.success(message);
        },
        error: (err) => {
          this.loaderService.hideLoader();
          this.requestInProgress = false;
          // console.log(err);
          const { message, data } = err;
          // this.toast.error(data?.title || message);
        },
      }
    )
    this.setSubscription(businessCategory);
  }

  setSubscription(request: Subscription): void {
    this.subscriptions.push(request);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

}
