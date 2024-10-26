import { IProject } from '@//app/models/IProject';
import { ProjectService } from '@//app/services/project/project.service';
import { CommonModule, NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-outstanding-projects',
  standalone: true,
  imports: [NgFor, CommonModule, FormsModule],
  templateUrl: './outstanding-projects.component.html',
  styleUrl: './outstanding-projects.component.css'
})
export class OutstandingProjectsComponent implements OnInit {
  private projectService = inject(ProjectService);
  private toast = inject(ToastrService);

  public projects$: Observable<IProject[]> = new Observable<IProject[]>();
  public filter: string = "";

  ngOnInit(): void {
    this.projects$ = this.projectService.getAllOutstandingProjects();
  }

  approveProject(id: number) {
    this.projectService.approveProjects(id).pipe(
      switchMap(() => {
        this.toast.success("Projeto aprovado com sucesso!");
        return this.projectService.getAllOutstandingProjects();
      }),
      catchError((error) => {
        this.toast.error("Erro ao aprovar projeto!");
        return of([]);
      })
    ).subscribe((projects) => {
      this.projects$ = of(projects);
    });
  }

  reproveProject(id: number) {
    this.projectService.failProjects(id).pipe(
      switchMap(() => {
        this.toast.error("Projeto rejeitado!");
        return this.projectService.getAllOutstandingProjects();
      })
    ).subscribe((projects) => {
      this.projects$ = of(projects);
    })
  }

  filterProjects() {
    this.projects$ = this.projectService.getAllOutstandingProjects().pipe(
      map(
        (projects: IProject[]) => projects.filter(
          (project: IProject) => project.titulo.toLocaleLowerCase().includes(this.filter.toLocaleLowerCase())
        )
      )
    )
  }
}
