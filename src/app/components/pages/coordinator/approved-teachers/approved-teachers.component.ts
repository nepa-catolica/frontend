import { Component, inject, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TeachersService } from '../../../../services/teachers/teachers.service';
import { ITeacher } from '../../../../models/ITeacher';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-approved-teachers',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor],
  templateUrl: './approved-teachers.component.html',
  styleUrl: './approved-teachers.component.css'
})
export class ApprovedTeachersComponent implements OnInit{

  private teacherService = inject(TeachersService);

  public teachers$: Observable<ITeacher[]> = new Observable<ITeacher[]>();
  public filter: string = "";

  ngOnInit(): void {
    this.teachers$ = this.teacherService.getTeachers();
  }

  filterTeachers() {
    this.teachers$ = this.teacherService.getTeachers().pipe(
      map(
        (teachers: ITeacher[]) => teachers.filter(
          (teacher: ITeacher) => teacher.Nome.toLocaleLowerCase().includes(this.filter.toLocaleLowerCase())
        )
      )
    )
  }
}
