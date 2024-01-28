import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {


  constructor(private http: HttpClient) { }

  getHeader(headers?: any) {
    let header = {
      'Content-Encoding': 'br'
    }

    if (headers) {
      Object.assign(header, headers['headers']);
    }

    return new HttpHeaders(header);
  }

  get(url: string, headers?: any, params?: null) {
    return this.http.get(url, { headers: this.getHeader(headers), params,   });
  }

  getWithParams(url: string, params?: any, headers?: any) {
    // console.log(params);
    return this.http.get(url, {
      headers: this.getHeader(headers),
      params: params
    });
  }

  postWithParams(url: string, params?: any, payload?:any, headers?: any) {
    // console.log(params);
    return this.http.post(url, payload, {
      headers: this.getHeader(headers),
      params: params
    });
  }

  putWithParams(url: string, params?: any, payload?:any, headers?: any) {
    // console.log(params);
    return this.http.put(url, payload, {
      headers: this.getHeader(headers),
      params: params
    });
  }

  getBlob(url: string) {
    return this.http.get(url, { responseType: 'blob' });
  }

  post(url: string, data: any, headers?: any) {
    return this.http.post(url, data, { headers: this.getHeader(headers) });
  }

  postWithProgress(url: string, data: any, headers?: any) {
    return this.http.post(url, data, {
      headers: this.getHeader(headers), reportProgress: true,
      observe: 'events'
    });
  }

  put(url: string, data: any, headers?: any) {
    return this.http.put(url, data, { headers: this.getHeader(headers) });
  }

  delete(url: string, data: any, headers?: any) {
    return this.http.request('delete', url, { body: data, headers: this.getHeader(headers) })
  }

}
