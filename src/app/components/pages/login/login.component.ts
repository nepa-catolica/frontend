import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonLoginRegisterComponent } from '@/components/buttons/login-register/login-register.component';
import { LoginService } from '@/services/login/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule, ButtonLoginRegisterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginService = inject(LoginService);
  formBuilderService = inject(NonNullableFormBuilder);
  router = inject(Router);
  loading: boolean = false;
  formSubmitted: boolean = false;

  form: FormGroup = this.formBuilderService.group({
    identifier: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  login() {
    this.loading = true;
    this.formSubmitted = true;
    this.form.markAllAsTouched()
    if (this.form.valid) {
      this.loginService.login(this.form.value).subscribe(
        () => {
          this.loading = false;
          this.router.navigate(['/home']);
        },
        error => {
          this.loading = false;
        }
      );
      this.router.navigate(['/home']);
      this.formSubmitted = false;
    } else {
      this.loading = false;
    }
  }

}
