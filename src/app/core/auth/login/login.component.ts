import { CommonStorageService } from './../../services/storage/common-storage.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FORM_VALIDATION } from 'src/app/data/form-validation-config';
import { AppToastrService } from '../../services/toastr/app-toastr.service';
import { AuthApiService } from '../../services/api/auth-api/auth-api.service';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { LoginValidator } from 'src/app/plugins/Validator/login-validator';
import { transitionAnimation } from 'src/app/plugins/animation/transition-animation';
import { RegisterNavigation } from 'src/app/shared/enum/register-navigations';
import { ReferenceName as refName } from '../../../shared/enum/reference-name.enum';


@Component({
  selector: 'qdo365-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [transitionAnimation]
})
export class LoginComponent implements OnInit {
  @Output() signupClicked = new EventEmitter();
  @Output() forgotClicked = new EventEmitter();

  subscriptions: Subscription[] = [];
  logInForm!: FormGroup;
  formValidation = FORM_VALIDATION;
  showPassword: boolean = false;
  requestInProgress: boolean = false;
  phoneNumberPattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

  navigation = RegisterNavigation;
  constructor(
    private formBuilder: FormBuilder,
    private toast: AppToastrService,
    private authApi: AuthApiService,
    private auth: AuthService,
    private router: Router,
    private commonStorage: CommonStorageService,
  ) { }

  ngOnInit(): void {

    this.logInForm = this.formBuilder.group({
      email: ['', [Validators.required, LoginValidator.emailOrPhoneValidator]],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.logInForm.controls;
  }

  onSignUp() {
    this.signupClicked.emit({ signup: true, forgotpassword: true });
  }
  onForgotPassword() {
    this.signupClicked.emit({ signup: true, forgotpassword: false });
  }

  isPhoneNumber(input: string): boolean {
    return this.phoneNumberPattern.test(input);
  }

  signIn() {
    if (this.logInForm.invalid) {
      console.log(this.logInForm);
      this.logInForm.markAllAsTouched();
      return;
    }

    this.requestInProgress = true;
    let payload = {
      "emailOrMobileNo": null,
      "password": this.logInForm.value.password
    }

    if (!this.isPhoneNumber(this.logInForm.value.email)) {
      payload['emailOrMobileNo'] = this.logInForm.value.email;
    } else {
      // payload['phoneCode'] = '+91';
      payload['emailOrMobileNo'] = '+91' + this.logInForm.value.email;
    }
    const request = this.authApi.login(payload).subscribe(
      {
        next: (res) => {
          // console.log(res);
          const { data, message } = res;
          // console.log(data);
          if(data?.id){
            data['user'] = { 'id': data?.id };
          }

          this.commonStorage.clear();
          this.requestInProgress = false;
          // this.toast.success('Logged in Successfully.');
          // console.log(this.navigation[data.navigateTo?.toUpperCase()], data.navigateTo?.toUpperCase());
          if (this.navigation[data.navigateTo?.toUpperCase()]){
            if(data.token){
              this.postLoginProcess(data);
            }
            if(data.navigateTo?.toUpperCase() == 'REGISTERPROFILE'){
              let tempPayload = {
                phoneCode: "+91",
                mobileNo: this.logInForm.value.email,
              }
              this.commonStorage.set(refName.PRE_REGISTER, tempPayload);
            }
            this.router.navigate([this.navigation[data.navigateTo?.toUpperCase()]]);
          }
        },
        error: (err) => {
          this.requestInProgress = false;
          const { message, data } = err;
          this.toast.error(message)
        },
      }
    )
    this.setSubscription(request);
  }

  async postLoginProcess(data: any) {
    await this.auth.setUserInfo(data.user);
    this.auth.setAccessToken(data.token);
    // this.auth.setRefreshToken(data.refresh_token);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  setSubscription(request: Subscription): void {
    this.subscriptions.push(request);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }


}
