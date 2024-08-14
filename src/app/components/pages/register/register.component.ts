import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonLoginRegisterComponent } from '../../buttons/login-register/login-register.component';
import { RegisterService } from '../../../services/register/register.service';
import { passwordMatchValidator } from '../../../validators/passwordMatchValidator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule, ButtonLoginRegisterComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerSerivice = inject(RegisterService);
  formBuilderService = inject(NonNullableFormBuilder);
  router = inject(Router);

  form: FormGroup = this.formBuilderService.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    matricula: ['', [Validators.required, Validators.minLength(6)]],
    curso: ['', [Validators.required, Validators.minLength(3)]],
    telefone: ['', [Validators.required, Validators.minLength(11)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
    role: ['', [Validators.required]]
  }, {validators: passwordMatchValidator});

  register() {
    if (this.form.valid) {
      const { confirmPassword, ...formData } = this.form.value;
      this.registerSerivice.createUser(formData).subscribe();
    } else {
      console.log('Formulário inválido');
    }
  }
}
