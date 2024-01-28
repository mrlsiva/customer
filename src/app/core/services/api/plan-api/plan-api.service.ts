import { Injectable } from '@angular/core';
import { HttpClientService } from '../../http-client/http-client.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanApiService {

  constructor(private httpService: HttpClientService) { }

  getPlans(): Observable<any> {
    return this.httpService.get(environment.BASE_URL + '/profileService/api/v1/plans/home', null);
  }
  getDashboardPlans(): Observable<any> {
    return this.httpService.get(environment.BASE_URL + '/profileService/api/v1/plans/dashboard', null);
  }

  getPlanDetail(planId: any): Observable<any> {
    return this.httpService.get(environment.BASE_URL + '/profileService/api/v1/plan/' + planId, null);
  }

  getPayments(): Observable<any> {
    return this.httpService.get(environment.BASE_URL + '/profileService/api/v1/paymentGateways', null);
  }

  getPaymentDetail(paymentId: any): Observable<any> {
    return this.httpService.get(environment.BASE_URL + '/profileService/api/v1/paymentGateway/' + paymentId, null);
  }

  subscribePlan(payload: any): Observable<any> {
    return this.httpService.post(environment.BASE_URL + '/profileService/api/v1/merchant/plan/subscribe', payload);
  }

  getCurrentPlan(payload: any): Observable<any> {
    return this.httpService.getWithParams(environment.BASE_URL + '/profileService/api/v1/merchant/plan/subscribe/details', payload);
  }
}
