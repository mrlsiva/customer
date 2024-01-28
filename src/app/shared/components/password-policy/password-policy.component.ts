import { Component, Input, OnInit } from '@angular/core';
import { FORM_VALIDATION } from 'src/app/data/form-validation-config';

@Component({
  selector: 'qdo365-password-policy',
  templateUrl: './password-policy.component.html',
  styleUrls: ['./password-policy.component.scss']
})
export class PasswordPolicyComponent implements OnInit {

  @Input() passwordValidationRule:any;
  formValidation = FORM_VALIDATION;

  constructor() { }

  ngOnInit(): void {
    console.log(this.passwordValidationRule)
  }

}
