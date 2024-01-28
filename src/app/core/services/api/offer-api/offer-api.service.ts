import { Injectable } from '@angular/core';
import { HttpClientService } from '../../http-client/http-client.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OfferApiService {

  constructor(private httpService: HttpClientService) { }

  getOffer(params?:any, payload?: any): Observable<any> {
    return this.httpService.postWithParams(environment.BASE_URL + '/offerService/api/v1/merchant/offers', params, payload);
  }

  viewOffer(id: any): Observable<any> {
    return this.httpService.get(environment.BASE_URL + '/offerService/api/v1/merchant/offer/' + id, null);
  }

  createOffer(payload: any): Observable<any> {
    return this.httpService.post(environment.BASE_URL + '/offerService/api/v1/merchant/offer', payload);
  }


  updateOffer(payload: any): Observable<any> {
    return this.httpService.put(environment.BASE_URL + '/offerService/api/v1/merchant/offer', payload);
  }

  getActiveOutlet(params: any): Observable<any> {
    return this.httpService.getWithParams(environment.BASE_URL + '/profileService/api/v1/merchant/activeOutlets', params);
  }

  getCategory(): Observable<any> {
    return this.httpService.get(environment.BASE_URL + '/profileService/api/v1/merchant/category', "");
  }

  getSubCategory(categoryId: any): Observable<any> {
    return this.httpService.get(environment.BASE_URL + '/profileService/api/v1/merchant/category/subcategory/'+ categoryId, null);
  }

  validateOfferCount(params: any): Observable<any> {
    return this.httpService.getWithParams(environment.BASE_URL + '/profileService/api/v1/merchant/validateOfferCount', params);
  }

  deactivateOffer(offerId: string): Observable<any> {
    return this.httpService.put(environment.BASE_URL + '/offerService/api/v1/merchant/offer/deactivate/'+ offerId, "");
  }

}
