import { Component, inject, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProjectService } from '@/services/project/project.service';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IProject } from '@/models/IProject';

@Component({
  selector: 'app-approved-projects',
  standalone: true,
  imports: [NgFor, CommonModule, FormsModule],
  templateUrl: './approved-projects.component.html',
  styleUrl: './approved-projects.component.css'
})
export class ApprovedProjectsComponent implements OnInit {
  private projectService = inject(ProjectService);

  public projects$: Observable<IProject[]> = new Observable<IProject[]>();
  public filter: string = "";

  ngOnInit(): void {
    this.projects$ = this.projectService.getAllApprovedProjects();
  }

  filterProjects() {
    this.projects$ = this.projectService.getAllApprovedProjects().pipe(
      map(
        (projects: IProject[]) => projects.filter(
          (project: IProject) => project.nome.toLocaleLowerCase().includes(this.filter.toLocaleLowerCase())
        )
      )
    )
  }
}
