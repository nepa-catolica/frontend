import { AbstractControl, ValidationErrors } from '@angular/forms';

export function invalidPasswordFormat(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (!passwordPattern.test(value)) {
    return { invalidPasswordFormat: true }; 
  }

  return null; 
}