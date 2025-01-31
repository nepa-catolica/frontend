import { Component, inject, OnInit } from '@angular/core';
import { TeachersService } from '@/services/teachers/teachers.service';
import { CommonModule } from '@angular/common';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { ITeacher } from '@/models/ITeacher';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-outstanding-teachers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './outstanding-teachers.component.html',
  styleUrl: './outstanding-teachers.component.css'
})
export class OutstandingTeachersComponent implements OnInit {

  private teacherService = inject(TeachersService);
  private toast = inject(ToastrService);
  private router = inject(Router);

  public teachers$: Observable<ITeacher[]> = new Observable<ITeacher[]>();
  public allTeachers: ITeacher[] = [];
  public filter: string = "";

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers(): void {
    this.teachers$ = this.teacherService.getOutstandingTeachers().pipe(
      tap((teachers) => {
        this.allTeachers = teachers;
      }),
      catchError(() => {
        this.toast.error("Erro ao carregar professores!");
        return of([]);
      })
    );
  }

  approveTeacher(id: string) {
    this.teacherService.approveTeachers(id).pipe(
      switchMap(() => {
        this.toast.success("Professor aprovado com sucesso!");
        this.allTeachers = this.allTeachers.filter((teacher) => teacher.id !== id);
        return of(this.allTeachers);
      }),
      catchError((error) => {
        this.toast.error("Erro ao aprovar professor!");
        return of([]);
      })
    ).subscribe((teachers) => {
      this.teachers$ = of(teachers);
    });
  }

  reproveTeacher(id: string) {
    this.teacherService.failTeachers(id).pipe(
      switchMap(() => {
        this.toast.error("Professor rejeitado!");
        this.allTeachers = this.allTeachers.filter((teacher) => teacher.id !== id);
        return of(this.allTeachers);
      })
    ).subscribe((teachers) => {
      this.teachers$ = of(teachers);
    })
  }

  filterTeachers() {
    this.teachers$ = of(this.allTeachers.filter(
      (teacher: ITeacher) => teacher.nome.toLocaleLowerCase().includes(this.filter.toLocaleLowerCase())
    ));
  }
}
