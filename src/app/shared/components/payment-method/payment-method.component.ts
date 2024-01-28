import { Component, Input, OnInit } from '@angular/core';
import { PaymentLogos } from '../../enum/register-navigations';
import { PlanApiService } from 'src/app/core/services/api/plan-api/plan-api.service';
import { CommonStorageService } from 'src/app/core/services/storage/common-storage.service';
import { ReferenceName } from '../../enum/reference-name.enum';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'qdo365-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit {

  subscriptions: Subscription[] = [];
  @Input() planList: any;
  @Input() planId: any;
  logos = PaymentLogos;
  paymentId: string = "";
  requestInProgress: boolean = false;
  paymentList: any;
  constructor(
    private planApi: PlanApiService,
    private commonStorage: CommonStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log(this.planList);
    this.getPaymentList();
  }

  getPaymentList() {
    this.requestInProgress = true;
    const paymentList = this.planApi.getPayments().subscribe(
      {
        next: (res) => {
          // console.log(res);
          const { message, data } = res;
          this.paymentList = this.compareAndMatchLogo(this.logos, data);
          // console.log(this.paymentList);
          this.requestInProgress = false;
          // this.toast.success(message);
        },
        error: (err) => {
          this.requestInProgress = false;
          // console.log(err);
          const { message, data } = err;
          // this.toast.error(data?.title || message);
        },
      }
    )
    this.setSubscription(paymentList);
  }

  compareAndMatchLogo(a: any[], b: any[]): any[] {
    return b.map((entryB) => {
      const matchedLog = a.find((entryA) => entryA.id.toLowerCase() === entryB.name.replace(/ /g, '').toLowerCase());
      if (matchedLog) {
        return { ...entryB, logo: matchedLog.src };
      }
      return entryB;
    });
  }

  selectPayment(paymentId) {
    this.paymentId = paymentId;
    this.getPaymentDetail();
  }

  get selectedPlanDetail() {
    return this.planList;
  }

  getPaymentDetail() {
    if (this.requestInProgress) {
      return;
    }
    this.requestInProgress = true;
    const paymentDetail = this.planApi.getPaymentDetail(this.paymentId).subscribe(
      {
        next: (res) => {
          // console.log(res);
          const { message, data } = res;
          // console.log(data);
          const paymentInfo = this.paymentList.find(x => x.id == this.paymentId);
          // this.currentPlanDetail = data;
          const mergedObject = {
            paymentName: paymentInfo.name,
            ...paymentInfo,
            paymentId: data.id,
            ...data,
            planId: this.planId,
            planName: this.selectedPlanDetail.name,
            ...this.selectedPlanDetail
          };

          // console.log(paymentInfo, data, mergedObject, this.selectedPlanDetail);
          // return;
          this.commonStorage.set(ReferenceName.SELECTED_PAYMENT, mergedObject)
          this.router.navigate(['./payment/paytm']);
          this.requestInProgress = false;
        },
        error: (err) => {
          this.requestInProgress = false;
          // console.log(err);
          const { message, data } = err;
          // this.toast.error(data?.title || message);
        },
      }
    )
    this.setSubscription(paymentDetail);
  }

  getPlanTax(deductionType) {
    // console.log(this.planList);
    if (deductionType == 'DISCOUNT') {
      const discountTotal = this.planList?.paymentDeductionsDTOS
        .filter(item => item.type === 'Discount')
        .reduce((total, item) => total + item.value, 0);
      return discountTotal;
    } else if (deductionType == 'TAX') {
      const taxTotal = this.planList?.paymentDeductionsDTOS
        .filter(item => item.type === 'Tax')
        .reduce((total, item) => total + item.value, 0);
      return taxTotal;
    }
    return 0;
  }

  setSubscription(request: Subscription): void {
    this.subscriptions.push(request);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

}
