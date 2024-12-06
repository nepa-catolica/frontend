import { IUser } from '@//app/models/IUser';
import { ProjectService } from '@//app/services/project/project.service';
import { CommonModule, NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Component({
  selector: 'app-students-in-project',
  standalone: true,
  imports: [NgFor, CommonModule, FormsModule],
  templateUrl: './students-in-project.component.html',
  styleUrl: './students-in-project.component.css'
})
export class StudentsInProjectComponent implements OnInit {
  private projectService = inject(ProjectService);
  private route = inject(ActivatedRoute);
  private toast = inject(ToastrService);

  public studentsRegisteredInTheProject$: Observable<IUser[]> = new Observable<IUser[]>();
  public students: any[] = [];
  public filter: string = "";

  ngOnInit(): void {
    this.getStudentsRegisteredInTheProject();
  }

  getStudentsRegisteredInTheProject() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.studentsRegisteredInTheProject$ = this.projectService.getAllStudentsRegisteredInTheProject(id);
    this.studentsRegisteredInTheProject$.subscribe((response: any) => {
      this.students = response.alunos.sort((a: any, b: any) => a.id - b.id);
    });
  }

  approveStudent(idStudent: number) {
    const idProject = Number(this.route.snapshot.paramMap.get('id'));
    this.projectService.approveStudentInProject(idProject, idStudent).pipe(
      tap(() => {
        this.toast.success("Aluno inscrito no projeto com sucesso!");
      }),
      catchError((error) => {
        this.toast.error("Não foi possível inscrever o aluno no projeto!");
        return of([]);
      })
    ).subscribe(() => this.getStudentsRegisteredInTheProject());
  }

  reproveStudent(idStudent: number) {
    const idProject = Number(this.route.snapshot.paramMap.get('id'));
    this.projectService.reproveStudentInProject(idProject, idStudent).pipe(
      tap(() => {
        this.toast.error("Aluno rejeitado no projeto com sucesso!");
      }),
      catchError((error) => {
        this.toast.error("Não foi possível rejeitar o aluno no projeto!");
        return of([]);
      })
    ).subscribe(() => this.getStudentsRegisteredInTheProject());
  }

  filterStudents() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.studentsRegisteredInTheProject$ = this.projectService.getAllStudentsRegisteredInTheProject(id).pipe(
      map(
        (students: IUser[]) => students.filter(
          (student: IUser) => student.nome.toLocaleLowerCase().includes(this.filter.toLocaleLowerCase())
        )
      )
    )
    this.studentsRegisteredInTheProject$.subscribe(studentsInTheProject => this.students = studentsInTheProject)
  }
}
