import { Injectable } from '@angular/core';
import { HttpClientService } from '../../http-client/http-client.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OutletApiService {

  constructor(private httpService: HttpClientService) { }

  getOutlet(params: any, payload: any): Observable<any> {
    return this.httpService.postWithParams(environment.BASE_URL + '/profileService/api/v1/merchant/outlets', params, payload);
  }

  pauseOutlet(params: any, id): Observable<any> {
    return this.httpService.putWithParams(environment.BASE_URL + '/profileService/api/v1/merchant/outlet/'+id+'/enableOrDisable', params);
  }

  viewOutlet(id: any): Observable<any> {
    return this.httpService.get(environment.BASE_URL + '/profileService/api/v1/merchant/outlet/' + id, null);
  }

  createOutlet(payload: any): Observable<any> {
    return this.httpService.post(environment.BASE_URL + '/profileService/api/v1/merchant/outlet', payload);
  }

  createOutletContact(payload: any): Observable<any> {
    return this.httpService.post(environment.BASE_URL + '/profileService/api/v1/merchant/outlet/contact', payload);
  }


  updateOutlet(payload: any): Observable<any> {
    return this.httpService.put(environment.BASE_URL + '/profileService/api/v1/merchant/outlet', payload);
  }
}
