import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommonStorageService } from '../../storage/common-storage.service';
import { DataStateService } from '../data-state.service';
import { ReferenceName } from 'src/app/shared/enum/reference-name.enum';

interface AuthState {
  loggedIn: boolean;
  userInfo: any;
  headerStatus: boolean;
  miniSearch: boolean;
  searchResult: boolean;
  isRefresh: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthDataService extends DataStateService<AuthState>  {

  loggedInStatus$: Observable<boolean>;
  miniSearch$: Observable<boolean>;
  searchResult$: Observable<boolean>;

  constructor(
    private commonStorage: CommonStorageService,
    ) {
    super();
    const initialState: AuthState = {
      loggedIn: false,
      userInfo: [],
      headerStatus: false,
      miniSearch: false,
      searchResult: false,
      isRefresh: false,
    };
    this.state$ = new BehaviorSubject<AuthState>(initialState);

    this.loggedInStatus$ = this.select('loggedIn');
    this.miniSearch$ = this.select('miniSearch');
    this.searchResult$ = this.select('searchResult');
  }

  setForceRefreshStatus(status: boolean): void {
    this.setState({ isRefresh: status });
  }

  setLoggedInStatus(status: boolean): void {
    this.setState({ loggedIn: status });
  }

  setUserProfileInfo(userInfo: any): void {
    this.setState({ userInfo: userInfo });
  }

  getUserProfileInfo() {
    let userInfo = this.selectSnapshot('userInfo');
    if(userInfo.length == 0){
      userInfo = this.commonStorage.get(ReferenceName.USER_INFO);
    }
    return userInfo;
  }

  setHeaderStatus(status: boolean) {
    this.setState({ headerStatus: status })
  }

  setMiniSearch(status: boolean) {
    this.setState({ miniSearch: status });
  }

  setSearchResult(status: boolean) {
    this.setState({ searchResult: status });
  }

  getHeaderStatus() {
    return this.selectSnapshot('headerStatus');
  }
}
