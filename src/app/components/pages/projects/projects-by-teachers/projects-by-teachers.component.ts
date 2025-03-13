import { IProject } from '@//app/models/IProject';
import { ISubToken } from '@//app/models/ISubToken';
import { LoginService } from '@//app/services/login/login.service';
import { ProjectService } from '@//app/services/project/project.service';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';

@Component({
  selector: 'app-projects-by-teachers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './projects-by-teachers.component.html',
  styleUrl: './projects-by-teachers.component.css'
})
export class ProjectsByTeachersComponent implements OnInit {
  private projectService = inject(ProjectService);
  private loginService = inject(LoginService);
  private toast = inject(ToastrService);

  public filter: string = "";
  public subToken: ISubToken | null = null;

  private projectsSubject = new BehaviorSubject<IProject[]>([]);
  private allProjects: IProject[] = [];
  projects$: Observable<IProject[]> = this.projectsSubject.asObservable();

  ngOnInit(): void {
    this.getProjects();
    this.subToken = this.loginService.decodeToken();
  }

  getProjects(): void {
    this.projectService.getProjectsByTeachers().pipe(
      tap((projects) => {
        this.allProjects = projects; 
        this.projectsSubject.next(projects);
      }),
      catchError(() => {
        this.toast.error("Erro ao carregar seus projetos!");
        return of([]);
      })
    ).subscribe();
  }

  filterProjects(): void {
    const filteredProjects = this.allProjects.filter((project: IProject) =>
      project.descricao.toLocaleLowerCase().includes(this.filter.toLocaleLowerCase())
    );

    this.projectsSubject.next(filteredProjects); 
  }
}
