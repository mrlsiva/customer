import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FORM_VALIDATION } from 'src/app/data/form-validation-config';
import { AuthApiService } from '../../services/api/auth-api/auth-api.service';
import { AppToastrService } from '../../services/toastr/app-toastr.service';
import { PasswordValidator } from 'src/app/plugins/Validator/password-validator';
import { transitionAnimation } from 'src/app/plugins/animation/transition-animation';
import { Subscription } from 'rxjs';

@Component({
  selector: 'qdo365-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  animations: [transitionAnimation]
})
export class ForgotPasswordComponent implements OnInit {
  showForgotPassword: boolean = true;
  showVerify: boolean = false;
  subscriptions: Subscription[] = [];
  @Output() forgotClicked = new EventEmitter();
  resetPasswordForm!: FormGroup;
  forgotPasswordForm!: FormGroup;
  formValidation = FORM_VALIDATION;
  requestInProgress: boolean = false;
  phoneNumberPattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toast: AppToastrService,
    private authApi: AuthApiService,
  ) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      phoneNo: ['', Validators.required],
      otp: ['']
    });
    this.resetPasswordForm = this.formBuilder.group({
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
    }, {
      validator: PasswordValidator.confirmedValidator('password', 'confirmPassword')
    });
  }

  get f() {
    return this.forgotPasswordForm.controls;
  }

  get p() {
    return this.resetPasswordForm.controls;
  }

  isPhoneNumber(input: string): boolean {
    return this.phoneNumberPattern.test(input);
  }

  getOtp() {
    if (this.forgotPasswordForm.invalid) {
      // console.log(this.forgotPasswordForm);
      this.forgotPasswordForm.markAllAsTouched();
      return;
    }
    let params = {
      phoneCode: "",
      mobileNo: "",
      email: ""
    }
    if (!this.isPhoneNumber(this.forgotPasswordForm.value.phoneNo)) {
      params['email'] = this.forgotPasswordForm.value.phoneNo;
    } else {
      params['phoneCode'] = '+91';
      params['mobileNo'] = this.forgotPasswordForm.value.phoneNo;
    }
    const forgotPasswordSend = this.authApi.forgotPasswordSend(params).subscribe(
      {
        next: (res) => {
          const { status, data, message } = res;
          this.toast.success(message);
          this.requestInProgress = false;
          this.showVerify = true;
          this.forgotPasswordForm.get('otp').setValidators([Validators.required]);
        },
        error: (error) => {
          this.requestInProgress = false;
          this.toast.error(error.message)
        },
      }
    )
    this.setSubscription(forgotPasswordSend);
  }

  verifyOtp() {
    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordForm.markAllAsTouched();
      return;
    }
    let params = {
      phoneCode: "",
      mobileNo: "",
      otp: this.forgotPasswordForm.value.otp,
      email: ""
    }
    if (!this.isPhoneNumber(this.forgotPasswordForm.value.phoneNo)) {
      params['email'] = this.forgotPasswordForm.value.phoneNo;
    } else {
      params['phoneCode'] = '+91';
      params['mobileNo'] = this.forgotPasswordForm.value.phoneNo;
    }
    const forgotPasswordVerify = this.authApi.forgotPasswordVerify(params).subscribe(
      {
        next: (res) => {
          const { status, data, message } = res;
          this.toast.success(message);
          this.requestInProgress = false;
          this.showVerify = false;
          this.showForgotPassword = false;
        },
        error: (error) => {
          this.requestInProgress = false;
          this.toast.error(error.message)
        },
      }
    )
    this.setSubscription(forgotPasswordVerify);
  }

  resetpassword() {
    if (this.resetPasswordForm.invalid) {
      console.log(this.resetPasswordForm);
      this.resetPasswordForm.markAllAsTouched();
      return;
    }
    let payload = {
      "phoneCode": "+91",
      "mobileNo": this.forgotPasswordForm.value.phoneNo,
      "password": this.resetPasswordForm.value.password,
    }
    const forgotPasswordReset = this.authApi.forgotPasswordReset(payload).subscribe(
      {
        next: (res) => {
          const { status, data, message } = res;
          this.toast.success(message);
          this.requestInProgress = false;
          this.showVerify = false;
          this.showForgotPassword = true;
          this.onSignin();
          this.router.navigate(['./home']);
        },
        error: (error) => {
          this.requestInProgress = false;
          this.toast.error(error.message)
        },
      }
    )
    this.setSubscription(forgotPasswordReset);
  }

  onSignin() {
    this.forgotClicked.emit({ signup: false, forgotpassword: false });
  }

  setSubscription(request: Subscription): void {
    this.subscriptions.push(request);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
