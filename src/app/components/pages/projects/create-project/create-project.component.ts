import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService } from '../../../../services/project/project.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent {

  projectService = inject(ProjectService);
  formBuilderService = inject(NonNullableFormBuilder);
  toast = inject(ToastrService);
  router = inject(Router);
  selectedFile: File | null = null;

  form: FormGroup = this.formBuilderService.group({
    nome: ['', [Validators.required, Validators.minLength(5)]],
    descricao: ['', [Validators.required, Validators.minLength(10)]],
    arquivo_pdf: [Validators.nullValidator]
  })

  getPdf(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.form.get('arquivo_pdf')?.setValue(this.selectedFile);
    }
  }

  createProject() {
    if (this.form.valid) {
      this.projectService.createProject(this.form.value).subscribe(
        () => {
          this.toast.success('Projeto criado com sucesso!');
          this.router.navigate(['/home']);
        },
        (error) => this.toast.error(`${error.error.message}`)
      );
    }
  }
}
