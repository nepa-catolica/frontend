import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TeachersService } from '../../../../services/teachers/teachers.service';
import { ITeacher } from '../../../../models/ITeacher';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-approved-teachers',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './approved-teachers.component.html',
  styleUrl: './approved-teachers.component.css'
})
export class ApprovedTeachersComponent implements OnInit{

  teacherService = inject(TeachersService);

  teachers$: Observable<ITeacher[]> = new Observable<ITeacher[]>();

  ngOnInit(): void {
    this.teachers$ = this.teacherService.getTeachers();
    this.teachers$.subscribe(
      teachers => console.log(teachers)
    )
  }
}
