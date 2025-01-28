import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonLoginRegisterComponent } from '@/components/buttons/login-register/login-register.component';
import { LoginService } from '@/services/login/login.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from '@//app/services/formError/error.service';
import { identifierValidator } from '@//app/validators/identifierValidator';

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
  toast = inject(ToastrService);
  router = inject(Router);
  formErrorService = inject(ErrorService);
  loading: boolean = false;

  form: FormGroup = this.formBuilderService.group({
    identifier: ['', [Validators.required, identifierValidator]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    return this.formErrorService.getErrorMessage(control!);
  }

  login() {
    this.loading = true;
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.loginService.login(this.form.value).subscribe(
        () => {
          this.router.navigate(['/home']);
          this.loading = false;
        },
        error => {
          this.loading = false;
        }
      );
      this.router.navigate(['/home']);
    } else {
      this.loading = false;
    }
  }

}
