import { Component, inject, OnInit } from '@angular/core';
import { TeachersService } from '../../../../services/teachers/teachers.service';
import { CommonModule, NgFor } from '@angular/common';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { ITeacher } from '../../../../models/ITeacher';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-outstanding-teachers',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './outstanding-teachers.component.html',
  styleUrl: './outstanding-teachers.component.css'
})
export class OutstandingTeachersComponent implements OnInit {

  private teacherService = inject(TeachersService);
  private toast = inject(ToastrService);
  private router = inject(Router);

  public teachers$: Observable<ITeacher[]> = new Observable<ITeacher[]>();
  public filter: string = "";

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers(): void {
    this.teachers$ = this.teacherService.getOutstandingTeachers().pipe(
      catchError(() => {
        this.toast.error("Erro ao carregar professores!");
        return of([]);
      })
    );
  }

  approveTeacher(id: number) {
    this.teacherService.approveTeachers(id).pipe(
      switchMap(() => {
        this.toast.success("Professor aprovado com sucesso!");
        return this.teacherService.getOutstandingTeachers();
      }),
      catchError((error) => {
        this.toast.error("Erro ao aprovar professor!");
        return of([]);
      })
    ).subscribe((teachers) => {
      this.teachers$ = of(teachers);
    });
  }

  reproveTeacher(id: number) {
    this.teacherService.failTeachers(id).pipe(
      switchMap(() => {
        this.toast.error("Professor rejeitado!");
        return this.teacherService.getOutstandingTeachers();
      })
    ).subscribe((teachers) => {
      this.teachers$ = of(teachers);
    })
  }

  filterTeachers() {
    this.teachers$ = this.teacherService.getOutstandingTeachers().pipe(
      map(
        (teachers: ITeacher[]) => teachers.filter(
          (teacher: ITeacher) => teacher.Nome.toLocaleLowerCase().includes(this.filter.toLocaleLowerCase())
        )
      )
    )
  }
}
