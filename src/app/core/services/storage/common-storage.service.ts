import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class CommonStorageService {

  constructor(@Inject(LOCAL_STORAGE) protected localStorage: StorageService) { }

  set(key: string, data: any) {
    return this.localStorage.set(key, data);
  }

  has(key: string){
    return this.localStorage.has(key)
  }

  get(key: string) {
    return this.localStorage.get(key);
  }

  remove(key: string) {
    return this.localStorage.remove(key);
  }

  clear() {
    return this.localStorage.clear();
  }
}
