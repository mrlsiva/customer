import { Injectable } from '@angular/core';
import { HttpClientService } from '../../http-client/http-client.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MerchantApiService {

  constructor(private httpService: HttpClientService) { }

  uploadAsset(payload: any): Observable<any> {
    return this.httpService.post(environment.BASE_URL + '/profileService/api/v1/merchant/uploadProfileImg', payload);
  }

  updateMerchantProfile(payload: any): Observable<any> {
    return this.httpService.put(environment.BASE_URL + '/profileService/api/v1/merchant', payload);
  }

  createMerchantContactDetail(payload: any): Observable<any> {
    return this.httpService.post(environment.BASE_URL + '/profileService/api/v1/merchant/contact', payload);
  }

  updateMerchantContactDetail(payload: any): Observable<any> {
    return this.httpService.put(environment.BASE_URL + '/profileService/api/v1/merchant/contact', payload);
  }

  updateMerchantBusinessName(payload: any): Observable<any> {
    return this.httpService.putWithParams(environment.BASE_URL + '/profileService/api/v1/merchant/businessName', payload);
  }

  changePassword(payload: any): Observable<any> {
    return this.httpService.post(environment.BASE_URL + '/profileService/api/v1/merchant/changePassword', payload);
  }

  getMerchantContactDetail(contactId: any): Observable<any> {
    return this.httpService.get(environment.BASE_URL + '/profileService/api/v1/merchant/contact/'+contactId);
  }
}
