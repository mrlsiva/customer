import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, switchMap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public isLoading = new BehaviorSubject<boolean>(false);
  public loaderConfig = new BehaviorSubject<any>({});

  showLoader(config: { hasOwnProperty?: any; type?: any; value?: any; size?: any; text?: any; fullscreen?: any; }) {
    const defaultConfig = {
      type: 'spinner',
      value: 0,
      size: 30,
      text: 'Loading...',
      fullscreen: false,
      ...config,
    };
    this.isLoading.next(true);
    this.loaderConfig.next(defaultConfig)
  }

  hideLoader() {
    setTimeout(() => {
      this.isLoading.next(false);
    }, 1000);
  }

  isLoading$(): Observable<boolean> {
    return this.isLoading.asObservable()
    // return this.isLoading.pipe(
    //   switchMap((isLoading) =>
    //     isLoading
    //       ? of(isLoading)
    //       : timer(1000).pipe(map(() => isLoading))
    //   )
    // );
  }

  loaderConfig$() {
    return this.loaderConfig.asObservable();
  }
}
