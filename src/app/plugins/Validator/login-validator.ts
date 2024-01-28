import { FormControl } from "@angular/forms";

export class LoginValidator {
  static emailOrPhoneValidator(control: FormControl): { [key: string]: boolean } | null {
  const value = control.value;

  // Regular expressions for email and phone number validation
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const phoneRegex = /^\d{10,}$/;

  if (value && (emailRegex.test(value) || phoneRegex.test(value))) {
    return null; // Validation successful
  } else {
    return { emailOrPhone: true }; // Validation failed
  }
}
}
