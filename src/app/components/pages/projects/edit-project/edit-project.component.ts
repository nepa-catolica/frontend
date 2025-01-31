import { IProject } from '@//app/models/IProject';
import { ErrorService } from '@//app/services/formError/error.service';
import { ProjectService } from '@//app/services/project/project.service';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.css'
})
export class EditProjectComponent implements OnInit {
  projectService = inject(ProjectService);
  formBuilderService = inject(NonNullableFormBuilder);
  formErrorService = inject(ErrorService);
  toast = inject(ToastrService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  formPage: number = 1;

  form: FormGroup = this.formBuilderService.group({
    titulo: ['', [Validators.required, Validators.minLength(5)]],
    titulacao: ['', [Validators.required, Validators.minLength(5)]],
    situacao: ['', [Validators.required]],
    curso: ['', [Validators.required]],
    linhaDePesquisa: ['', [Validators.required, Validators.minLength(5)]],
    descricao: ['', [Validators.required, Validators.minLength(5)]],
    palavrasChave: ['', [Validators.required, Validators.minLength(5)]],
    localizacao: ['', [Validators.required]],
    populacao: ['', [Validators.required]],
    justificativa: ['', [Validators.required]],
    objetivoGeral: ['', [Validators.required]],
    objetivoEspecifico: ['', [Validators.required]],
    metodologia: ['', [Validators.required]],
    cronogramaDeAtividade: ['', [Validators.required]],
    referencias: ['', [Validators.required]],
    termos: [false, [Validators.required]],
    vagas: [null, [Validators.required]]
  })

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    return this.formErrorService.getErrorMessage(control!);
  }
  
  ngOnInit(): void {
    this.getProject();
  }

  getProject() {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.projectService.getProjectById(id).subscribe((project: IProject) => {
      this.form.patchValue({...project})
    });
  }

  nextPage() {
    this.formPage++;
  }

  previousPage() {
    this.formPage--;
  }

  editProject() {

    const id = this.route.snapshot.paramMap.get('id')!;

    if (this.form.valid) {
      this.projectService.editProject(id, this.form.value).subscribe(
        () => {
          this.toast.success('Projeto editado com sucesso!');
          this.router.navigate(['/home']);
        },
        (error) => this.toast.error(`${error.error.message}`)
      );
    }
  }
}
