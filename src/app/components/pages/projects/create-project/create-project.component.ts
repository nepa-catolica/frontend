import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService } from '@/services/project/project.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

interface content {
  id: string;
  message: string;
}

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

  nextPage() {
    this.formPage++;
  }

  previousPage() {
    this.formPage--;
  }

  // addKeyword() {
  //   const wordControl = this.form.get('palavrasChave');
  //   const word: string = wordControl ? wordControl.value : '';

  //   this.listKeywords.push(word);
  //   wordControl?.setValue('');
  // }

  createProject() {

    // const wordControl = this.form.get('palavrasChave');
    // wordControl?.setValue(this.listKeywords);

    if (this.form.valid) {
      console.log(this.form)
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
