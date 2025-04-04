import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  getErrorMessage(control: AbstractControl): string {
    if (control.hasError('required')) {
      return '*Campo obrigatório*';
    } else if (control.hasError('minlength')) {
      return `*Mínimo de ${control.getError('minlength').requiredLength} caracteres*`;
    } else if (control.hasError('maxlength')) {
      return `*Máximo de ${control.getError('maxlength').requiredLength} caracteres*`;
    } else if (control.hasError('passwordsMismatch')) {
      return '*As senhas não coincidem*';
    } else if (control.hasError('invalidIdentifier')) {
      return '*Email ou matrícula inválida. Verifique o formato e tente novamente*';
    } else if (control.hasError('invalidFileType')) {
      return '*Apenas arquivos PDF são permitidos*';
    } else if (control.hasError('fileTooLarge')) {
      return '*O arquivo deve ter no máximo 5MB*';
    } else if (control.hasError('pattern')) {
      return '*A matrícula deve conter apenas letras ou números*';
    }

    return '';
  }
}
