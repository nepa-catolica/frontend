import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonLoginRegisterComponent } from '@/components/buttons/login-register/login-register.component';
import { RegisterService } from '@/services/register/register.service';
import { passwordMatchValidator } from '@/validators/passwordMatchValidator';
import { ToastrService } from 'ngx-toastr';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule, ButtonLoginRegisterComponent, NgxMaskDirective, NgxMaskPipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerSerivice = inject(RegisterService);
  formBuilderService = inject(NonNullableFormBuilder);
  router = inject(Router);
  toast = inject(ToastrService);

  form: FormGroup = this.formBuilderService.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    matricula: ['', [Validators.required, Validators.minLength(6)]],
    curso: ['', [Validators.required, Validators.minLength(3)]],
    telefone: ['', [Validators.required, Validators.minLength(11)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')]],
    confirmPassword: ['', Validators.required],
    role: ['', [Validators.required]]
  }, {validators: passwordMatchValidator});

  register() {
    if (this.form.valid) {
      const { confirmPassword, ...formData } = this.form.value;
      this.toast.success("Usuário criado com sucesso!");
      this.registerSerivice.createUser(formData).subscribe();
    } else {
      this.toast.error("Erro ao criar usuário!");
      console.error('Formulário inválido');
    }
  }
}
