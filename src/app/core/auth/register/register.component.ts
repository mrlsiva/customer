import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApiService } from '../../services/api/auth-api/auth-api.service';
import { AppToastrService } from '../../services/toastr/app-toastr.service';
import { FORM_VALIDATION } from 'src/app/data/form-validation-config';
import { PasswordValidator } from 'src/app/plugins/Validator/password-validator';
import { Subscription } from 'rxjs';
import { transitionAnimation } from 'src/app/plugins/animation/transition-animation';
import { CommonStorageService } from '../../services/storage/common-storage.service';
import { ReferenceName as refName } from '../../../shared/enum/reference-name.enum';
import { TermsComponent } from 'src/app/shared/components/terms/terms.component';
import { MatDialog } from '@angular/material/dialog';
import { LoaderService } from '../../services/loader/loader.service';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';

@Component({
  selector: 'qdo365-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [transitionAnimation]
})

export class RegisterComponent implements OnInit {

  @ViewChild('mobileCountDown', { static: false }) mobileCountDown: CountdownComponent;
  showRegister: boolean = true;
  showVerify: boolean = false;
  @Output() signinClicked = new EventEmitter();
  passwordSetForm!: FormGroup;
  preRegisterForm!: FormGroup;
  formValidation = FORM_VALIDATION;
  requestInProgress: boolean = false;
  subscriptions: Subscription[] = [];
  isValidMobile: boolean = false;
  successMsg: string = null;
  errorMsg: string = null;
  mobileConfig: CountdownConfig;
  mobileCount: number = 2; //mins
  mobileStatus: string = 'ready';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toast: AppToastrService,
    private authApi: AuthApiService,
    private commonStorage: CommonStorageService,
    public dialog: MatDialog,
    private loaderService: LoaderService
  ) {
  }
  openDialog() {
    const dialogRef = this.dialog.open(TermsComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.passwordSetForm.get('terms').setValue(result);
    });
  }
  ngOnInit(): void {
    this.mobileConfig = {
      leftTime: this.mobileCount * 60,
      formatDate: ({ date }) => `${date / 1000}`,
      demand: true
    };
    this.preRegisterForm = this.formBuilder.group({
      phoneNo: ['', [Validators.required, Validators.pattern(this.formValidation.validation_regex.phone)]],
      otp: ['']
    });

    this.passwordSetForm = this.formBuilder.group({
      password: ['', Validators.compose([Validators.required,
      PasswordValidator.patternValidator(this.formValidation.validation_regex.number_only, {
        hasNumber: true
      }),
      PasswordValidator.patternValidator(this.formValidation.validation_regex.upper_case_only, {
        hasCapitalCase: true
      }),
      PasswordValidator.patternValidator(this.formValidation.validation_regex.lower_case_only, {
        hasSmallCase: true
      }),
      PasswordValidator.patternValidator(
        this.formValidation.validation_regex.special_character,
        {
          hasSpecialCharacters: true
        }),
      Validators.minLength(this.formValidation.min_length.password),
      Validators.maxLength(this.formValidation.max_length.password),
      ])],
      confirmPassword: ['', Validators.required],
      terms: ['', Validators.requiredTrue],
    }, {
      validator: PasswordValidator.confirmedValidator('password', 'confirmPassword')
    });

    const phoneNo = this.preRegisterForm.get('phoneNo').valueChanges.subscribe((data) => {
      // console.log(data, 'length => ' + data.length, this.preRegisterForm.invalid);
      if (data && data.length == 10) {
        this.backToOtp();
        setTimeout(() => {
          this.errorMsg = null;
          this.successMsg = null;
          this.vaidateMobileNo();
        }, 100);
      }
    });
    this.setSubscription(phoneNo);
  }

  timerCompleted(event, timerType) {
    console.log(event);
    if (event.action === 'done' && timerType === 'mobile') {
      this.mobileStatus = 'end';
    }

  }

  get f() {
    return this.preRegisterForm.controls;
  }

  get p() {
    return this.passwordSetForm.controls;
  }

  backToOtp(){
    this.preRegisterForm.get('otp').setValidators(null);
    this.preRegisterForm.get('otp').setValue(null);
    this.showVerify = false;
  }

  vaidateMobileNo() {
    if (this.preRegisterForm.invalid) {
      this.preRegisterForm.markAllAsTouched();
      return;
    }
    this.loaderService.showLoader({
      text: 'Verifying Mobile no...',
      fullscreen: true,
    });
    this.requestInProgress = true;
    let params = {
      phoneCode: '+91',
      mobileNo: this.preRegisterForm.value.phoneNo,
    }
    // console.log(params);
    const validateMobile = this.authApi.validateMobileNo(params).subscribe(
      {
        next: (res) => {
          const { status, data, message } = res;
          this.requestInProgress = false;
          this.loaderService.hideLoader();
          if (message !== "Merchant not found") {
            this.toast.error(message);
            this.isValidMobile = false;
            this.errorMsg = message;
            this.successMsg = null;
            return;
          }
          this.isValidMobile = true;
          // this.preRegisterForm.get('otp').setValidators([Validators.required]);
          // this.showVerify = true;
          // this.toast.success('Otp is Send to your mobile no Successfully.');
        },
        error: (error) => {
          this.loaderService.hideLoader();
          this.requestInProgress = false;
          this.toast.error(error.message);
          this.errorMsg = error.message;
          this.successMsg = null;
        },
      }
    )
    this.setSubscription(validateMobile);
  }

  resend(){
    if(['start'].includes(this.mobileStatus)){
      return;
    }
    this.requestInProgress = true;
    let params = {
      "phoneCode": "+91",
      "mobileNo": this.preRegisterForm.value.phoneNo,
      "email": ''
    }
    this.loaderService.showLoader({
      text: 'Resending Otp...',
      fullscreen: true,
    });
    const sendOtp = this.authApi.sendOtp(params).subscribe(
      {
        next: (res) => {
          // console.log(res);
          const { message, data } = res;
          this.loaderService.hideLoader();
          this.requestInProgress = false;
          this.preRegisterForm.get('otp').setValidators([Validators.required]);
          this.showVerify = true;
          this.mobileStatus = 'start';
            setTimeout(() => {
              this.mobileCountDown.begin();
            }, 1000);
          this.toast.success(message);
        },
        error: (err) => {
          this.loaderService.hideLoader();
          this.requestInProgress = false;
          // console.log(err);
          const { message, data } = err;
          this.toast.error(data?.title || message);
        },
      }
    )
    this.setSubscription(sendOtp);
  }

  getOtp() {
    if(!this.isValidMobile){
      return;
    }
    if (this.preRegisterForm.invalid) {
      this.preRegisterForm.markAllAsTouched();
      return;
    }
    this.loaderService.showLoader({
      text: 'Sending Otp...',
      fullscreen: true,
    });
    this.requestInProgress = true;
    let params = {
      "phoneCode": "+91",
      "mobileNo": this.preRegisterForm.value.phoneNo,
      "email": ''
    }
    const sendOtp = this.authApi.sendOtp(params).subscribe(
      {
        next: (res) => {
          // console.log(res);
          const { message, data } = res;
          this.loaderService.hideLoader();
          this.requestInProgress = false;
          this.preRegisterForm.get('otp').setValidators([Validators.required]);
          this.showVerify = true;
          this.mobileStatus = 'start';
            setTimeout(() => {
              this.mobileCountDown.begin();
            }, 1000);
          this.toast.success(message);
          this.successMsg = message;
          this.errorMsg = null;
        },
        error: (err) => {
          this.loaderService.hideLoader();
          this.requestInProgress = false;
          // console.log(err);
          const { message, data } = err;
          this.toast.error(data?.title || message);
        },
      }
    )
    this.setSubscription(sendOtp);
  }

  verifyOtp() {
    if (this.preRegisterForm.invalid) {
      this.preRegisterForm.markAllAsTouched();
      return;
    }
    // this.showVerify = false;
    // this.showRegister = false;
    // return;
    this.loaderService.showLoader({
      text: 'Verifying Otp...',
      fullscreen: true,
    });
    this.requestInProgress = true;
    let params = {
      phoneCode: "+91",
      mobileNo: this.preRegisterForm.value.phoneNo,
      email: '',
      otp: this.preRegisterForm.value.otp
    }
    const verifyOtp = this.authApi.verifyOtp(params).subscribe(
      {
        next: (res) => {
          // console.log(res);
          const { message, data } = res;
          this.requestInProgress = false;
          this.loaderService.hideLoader();
          this.showVerify = false;
          this.showRegister = false;
          this.toast.success(message);
        },
        error: (err) => {
          this.loaderService.hideLoader();
          this.requestInProgress = false;
          // console.log(err);
          const { message, data } = err;
          this.toast.error(message);
        },
      }
    )
    this.setSubscription(verifyOtp);
  }

  createAccount() {
    // this.showVerify = false;
    // this.showRegister = true;
    // this.router.navigate(['./get-start/register']);
    // return;
    if (this.passwordSetForm.invalid) {
      // console.log(this.passwordSetForm);
      this.passwordSetForm.markAllAsTouched();
      return;
    }
    this.loaderService.showLoader({
      text: 'Account Creating...',
      fullscreen: true,
    });
    this.requestInProgress = true;
    let payload = {
      phoneCode: "+91",
      mobileNo: this.preRegisterForm.value.phoneNo,
      otp: this.preRegisterForm.value.otp,
      password: this.passwordSetForm.value.password,
    }
    const createAccount = this.authApi.createAccount(payload).subscribe(
      {
        next: (res) => {
          // console.log(res);
          const { message, data } = res;
          this.loaderService.hideLoader();
          this.commonStorage.set(refName.PRE_REGISTER, payload);
          this.requestInProgress = false;
          this.toast.success(message);
          this.showVerify = false;
          this.showRegister = true;
          this.router.navigate(['./get-start/register']);
        },
        error: (err) => {
          this.loaderService.hideLoader();
          this.requestInProgress = false;
          // console.log(err);
          const { message, data } = err;
          this.toast.error(message);
        },
      }
    )
    this.setSubscription(createAccount);
  }

  onSignin() {
    this.signinClicked.emit({ signin: false });
  }

  setSubscription(request: Subscription): void {
    this.subscriptions.push(request);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
