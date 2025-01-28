import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonLoginRegisterComponent } from '@/components/buttons/login-register/login-register.component';
import { RegisterService } from '@/services/register/register.service';
import { passwordMatchValidator } from '@/validators/passwordMatchValidator';
import { ToastrService } from 'ngx-toastr';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { ErrorService } from '@//app/services/formError/error.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule, ButtonLoginRegisterComponent, NgxMaskDirective],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerSerivice = inject(RegisterService);
  formBuilderService = inject(NonNullableFormBuilder);
  formErrorService = inject(ErrorService);
  router = inject(Router);
  toast = inject(ToastrService);
  loading: boolean = false;

  form: FormGroup = this.formBuilderService.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    matricula: ['', [Validators.required, Validators.minLength(8)]],
    curso: ['', [Validators.required, Validators.minLength(3)]],
    telefone: ['', [Validators.required, Validators.minLength(11)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required],
    codigo_curso: ['', [Validators.required, Validators.minLength(7)]],
    role: ['', [Validators.required]]
  }, {validators: passwordMatchValidator});

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    return this.formErrorService.getErrorMessage(control!);
  }

  register() {
    this.loading = true;
    this.form.markAllAsTouched();

    const { confirmPassword, ...formData } = this.form.value;

    if (this.form.get('role')?.value === 'professor') {
      delete formData.matricula;
      delete formData.curso;
      this.form.get('matricula')?.disable();
      this.form.get('curso')?.disable();
    } else if (this.form.get('role')?.value === 'aluno') {
      delete formData.codigo_curso;
      this.form.get('codigo_curso')?.disable();
    }

    if (this.form.valid) {
      this.registerSerivice.createUser(formData).subscribe(
        () => {
          this.toast.success("Usuário criado com sucesso!");
          this.loading = false;
          this.form.reset();
          this.enableControls();
        },
        (error) => {
          this.loading = false;
          const errorMessage = error?.error?.msg || "Erro ao cadastrar usuário, consulte o coordenador!";
          this.toast.error(`Erro ao cadastrar usuário: ${errorMessage}`);
          this.enableControls();
        } 
      );
    } else {
      this.loading = false;
    }
  }

  enableControls() {
    this.form.get('matricula')?.enable();
    this.form.get('curso')?.enable();
    this.form.get('codigo_curso')?.enable();
  }
}
