import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CommonStorageService } from '../storage/common-storage.service';
import { ReferenceName as refName } from '../../../shared/enum/reference-name.enum';
import { AuthApiService } from '../api/auth-api/auth-api.service';
import { Buffer } from 'buffer/';
import { AuthDataService } from '../data/auth-data/auth-data.service';



interface AuthState {
  loggedIn: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private refreshTokenTimeout: any;

  constructor(
    private commonStorage: CommonStorageService,
    private authState: AuthDataService,
    private authAPI: AuthApiService
  ) {

    // Set loggedIn status to Auth State
    authState.setLoggedInStatus(this.isLoggedInStatus());

    // Set user info data to Auth State
    const userInfo = this.getUserInfo();
  }

  isLoggedInStatus() {
    return !!this.commonStorage.get(refName.ACCESS_TOKEN);
  }

  setAccessToken(token: any) {
    this.authState.setLoggedInStatus(true);
    return this.commonStorage.set(refName.ACCESS_TOKEN, token);
  }

  getAccessToken() {
    return this.commonStorage.get(refName.ACCESS_TOKEN);
  }

  getRefreshToken() {
    return this.commonStorage.get(refName.REFRESH_TOKEN);
  }

  setRefreshToken(token: any) {
    const tokenResponse = this.commonStorage.set(refName.REFRESH_TOKEN, token);
    if (!this.getAccessToken()) {
      this.startRefreshTokenTimer();
    }
    return tokenResponse
  }


  setUserInfo(data: any) {
    this.authState.setUserProfileInfo(data);
    return this.commonStorage.set(refName.USER_INFO, data);
  }

  getUserInfo() {
    return this.commonStorage.get(refName.USER_INFO);
  }

  getUserId() {
    let user = this.getUserInfo()
    return (user && user.id) ? user.id : null;
  }

  logout() {
    this.stopRefreshTokenTimer();
    this.commonStorage.clear();
    this.authState.setLoggedInStatus(false);
    return true;
  }

  refreshToken(): Observable<any> {
    const refresh_token = this.getRefreshToken();
    if (!refresh_token || !this.isLoggedInStatus()) return new Observable((observer) => observer.complete());

    return this.authAPI.refreshToken({ refresh_token })
      .pipe(map((data: any) => {
        const { access_token, refresh_token } = data.data;
        this.setAccessToken(access_token);
        this.setRefreshToken(refresh_token);
        this.startRefreshTokenTimer();
        return data;
      }));
  }

  isProfileVerified(){
    let userInfo = this.commonStorage.get(refName.USER_INFO);
    return userInfo.status === 'APPROVED';
  }

  private startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    // const jwtToken = JSON.parse(atob(this.getAccessToken().split('.')[1]));
    const jwtToken = JSON.parse(Buffer.from(this.getAccessToken().split('.')[1], 'base64').toString());

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);

    if (!this.refreshTokenTimeout) return;

    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }

}
