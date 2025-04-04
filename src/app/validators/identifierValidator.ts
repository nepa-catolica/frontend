import { AbstractControl, ValidationErrors } from '@angular/forms';

export function identifierValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const matriculaPattern = /^[a-zA-Z0-9]{8,15}$/;

  if (!emailPattern.test(value) && !matriculaPattern.test(value)) {
    return { invalidIdentifier: true };
  }

  return null;
}
