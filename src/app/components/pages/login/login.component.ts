import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonLoginRegisterComponent } from '../../buttons/login-register/login-register.component';
import { LoginService } from '../../../services/login/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule, ButtonLoginRegisterComponent, NgOptimizedImage],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginService = inject(LoginService);
  formBuilderService = inject(NonNullableFormBuilder);
  router = inject(Router);

  form: FormGroup = this.formBuilderService.group({
    identifier: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  login() {
    if (this.form.valid) {
      this.loginService.login(this.form.value).subscribe(
        () => {
          this.router.navigate(['/home']);
        },
        error => {
          console.log('Erro de login', error);
        }
      );
      this.router.navigate(['/home']);
    }
  }

}
