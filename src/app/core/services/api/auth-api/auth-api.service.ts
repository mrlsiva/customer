import { HttpClientService } from './../../http-client/http-client.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(private httpService: HttpClientService) { }

  login(payload: any): Observable<any> {
    return this.httpService.post(environment.BASE_URL + '/profileService/api/v1/merchant/login', payload);
  }

  validateMobileNo(params: any): Observable<any> {
    return this.httpService.getWithParams(environment.BASE_URL + '/profileService/api/v1/merchant/account/validate', params);
  }

  sendOtp(params: { phoneCode?: string | null, mobileNo?: string | null, email?: string | null }): Observable<any> {
    return this.httpService.getWithParams(environment.BASE_URL + '/profileService/api/v1/merchant/register/sendOtp', params);
  }

  verifyOtp(params: { phoneCode?: string | null, mobileNo?: string | null, email?: string | null, otp: string }): Observable<any> {
    return this.httpService.getWithParams(environment.BASE_URL + '/profileService/api/v1/merchant/register/verifyOtp', params);
  }

  createAccount(payload: any): Observable<any> {
    return this.httpService.post(environment.BASE_URL + '/profileService/api/v1/merchant/account', payload);
  }


  createProfile(payload: any): Observable<any> {
    return this.httpService.post(environment.BASE_URL + '/profileService/api/v1/merchant/register', payload);
  }

  getBusinessCategory(): Observable<any> {
    return this.httpService.get(environment.BASE_URL + '/profileService/api/v1/merchant/businessCategory', "");
  }

  getBusinessSubCategory(businessId: string): Observable<any> {
    return this.httpService.get(environment.BASE_URL + '/profileService/api/v1/merchant/category/subcategory/' + businessId, "");
  }


  logout(): Observable<any> {
    return this.httpService.get(environment.BASE_URL + '/login/logout', "");
  }

  refreshToken(payload: { refresh_token: any; }): Observable<any> {
    return this.httpService.post(environment.BASE_URL + '/v1/common/token/refresh', payload);
  }


  getUserInfo(id: string): Observable<any> {
    return this.httpService.get(environment.BASE_URL + '/profileService/api/v1/merchant/' + id, null);
  }

  getDashboardInfo(id: string): Observable<any> {
    return this.httpService.get(environment.BASE_URL + '/profileService/api/v1/merchant/dashboard/' + id, null);
  }


  forgotPasswordSend(params: any): Observable<any> {
    return this.httpService.getWithParams(environment.BASE_URL + '/profileService/api/v1/merchant/password/sendOtp', params);
  }

  forgotPasswordVerify(params: any): Observable<any> {
    return this.httpService.getWithParams(environment.BASE_URL + '/profileService/api/v1/merchant/password/verifyOtp', params);
  }

  forgotPasswordReset(payload: any): Observable<any> {
    return this.httpService.post(environment.BASE_URL + '/profileService/api/v1/merchant/forgotPassword', payload);
  }

}
