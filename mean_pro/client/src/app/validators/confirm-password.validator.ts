// src/app/validators/confirm-password.validator.ts

import { AbstractControl, ValidatorFn } from '@angular/forms';

export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
  
    return password !== confirmPassword ? { 'passwordMismatch': true } : null;
  };
  
