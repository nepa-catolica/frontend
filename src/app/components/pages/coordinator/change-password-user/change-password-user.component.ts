import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { ButtonLoginRegisterComponent } from '../../../buttons/login-register/login-register.component';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ManageUsersService } from '@//app/services/admin/manage-users.service';
import { passwordMatchValidator } from '@//app/validators/passwordMatchValidator';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from '@//app/services/formError/error.service';
import { IUser } from '@//app/models/IUser';

@Component({
  selector: 'app-change-password-user',
  standalone: true,
  imports: [ButtonLoginRegisterComponent, ReactiveFormsModule, NgIf],
  templateUrl: './change-password-user.component.html',
  styleUrl: './change-password-user.component.css'
})
export class ChangePasswordUserComponent implements OnInit {
  private adminService = inject(ManageUsersService);
  private formBuilderService = inject(NonNullableFormBuilder);
  private formErrorService = inject(ErrorService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toast = inject(ToastrService);
  public user: any | null = null;
  public role: 'aluno' | 'professor' | null = null;
  loading: boolean = false;

  form: FormGroup = this.formBuilderService.group({
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required]
  }, {validators: passwordMatchValidator});

  ngOnInit(): void {
    const role = this.route.snapshot.paramMap.get('role');
    if (role === 'professor') {
      this.role = 'professor';
    } else if (role === 'aluno') {
      this.role = 'aluno';
    }

    this.getSelectedUser();

  }

  getSelectedUser() {
    const id = this.route.snapshot.paramMap.get('id');
    if(this.role === 'professor') {
      this.adminService.getTeacher(id!).subscribe({
        next: (teacher: any) => {
          this.user = teacher;
        },
        error: () => {
          this.toast.error("Erro ao carregar professor!");
        }
      });
    } else if (this.role === 'aluno') {
      this.adminService.getStudent(id!).subscribe({
        next: (student: any) => {
          this.user = student;
        },
        error: () => {
          this.toast.error("Erro ao carregar aluno!");
        }
      });
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    return this.formErrorService.getErrorMessage(control!);
  }

  changePassword() {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!this.user) {
      this.toast.error("Usuário não encontrado!");
      return;
    }

    this.loading = true;

    const passwordData = { password: this.form.get('password')?.value };

    if (this.role === 'professor') {
      this.adminService.changePasswordTeacher(this.user.professor.id, passwordData).subscribe({
        next: () => {
          this.toast.success("Senha alterada com sucesso!");
          this.router.navigate([`/professores-aprovados`]);
        },
        error: () => {
          this.toast.error("Erro ao alterar senha!");
          this.loading = false;
        }
      });
    } else if (this.role === 'aluno') {
      this.adminService.changePasswordStudent(this.user.aluno.id, passwordData).subscribe({
        next: () => {
          this.toast.success("Senha alterada com sucesso!");
          this.router.navigate([`/alunos`]);
        },
        error: () => {
          this.toast.error("Erro ao alterar senha!");
          this.loading = false;
        }
      });
    }
  }

}
