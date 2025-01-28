import { AbstractControl, ValidationErrors } from '@angular/forms';

export function fileValidator(): (control: AbstractControl) => ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value as File;

    if (file) {
      const isPdf = file.type === 'application/pdf';

      const maxSize = 5 * 1024 * 1024;

      if (!isPdf) {
        return { invalidFileType: true };
      }

      if (file.size > maxSize) {
        return { fileTooLarge: true };
      }
    }

    return null;
  };
}