import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService } from '../../../../services/project/project.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { v4 as uuidv4} from 'uuid';

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

  listKeywords: string[] = [];
  listMethodology: string[] = [];
  listTimeline: string[] = [];

  form: FormGroup = this.formBuilderService.group({
    titulo: ['', [Validators.required, Validators.minLength(5)]],
    titulacao: ['', [Validators.required, Validators.minLength(5)]],
    situacao: ['', [Validators.required]],
    curso: ['', [Validators.required]],
    linhaDePesquisa: ['', [Validators.required, Validators.minLength(5)]],
    descricao: ['', [Validators.required, Validators.minLength(5)]],
    palavrasChave: [[]],
    localizacao: ['', [Validators.required]],
    populacao: ['', [Validators.required]],
    justificativa: ['', [Validators.required]],
    objetivoGeral: ['', [Validators.required]],
    objetivoEspecifico: [[]],
    metodologia: ['', [Validators.required]],
    cronogramaDeAtividade: [[]],
    referencias: ['', [Validators.required]],
    termos: [false, [Validators.required]],
  })

  nextPage() {
    this.formPage++;
  }

  previousPage() {
    this.formPage--;
  }

  addKeyword() {
    const wordControl = this.form.get('palavrasChave');
    const word: string = wordControl ? wordControl.value : '';

    this.listKeywords.push(word);
    wordControl?.setValue('');
  }


  addMethodology() {
    const methodologyControl = this.form.get('metodologia');
    const methodology: string = methodologyControl ? methodologyControl.value : '';

    this.listMethodology.push(methodology);
    methodologyControl?.setValue('');
  }

  addTimeline() {
    const timelineControl = this.form.get('cronogramaDeAtividade');
    const timeline: string = timelineControl ? timelineControl.value : '';

    this.listTimeline.push(timeline);
    timelineControl?.setValue('');
  }

  createProject() {

    const wordControl = this.form.get('palavrasChave');
    const methodologyControl = this.form.get('metodologia');
    const timelineControl = this.form.get('cronogramaDeAtividade');
    
    wordControl?.setValue(this.listKeywords);
    methodologyControl?.setValue(this.listMethodology);
    timelineControl?.setValue(this.listTimeline);

    console.log(this.form);
    
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
