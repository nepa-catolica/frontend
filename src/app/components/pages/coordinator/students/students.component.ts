import { ManageUsersService } from '@//app/services/admin/manage-users.service';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {
  private adminService = inject(ManageUsersService);
  public students$: Observable<any[]> = new Observable<any[]>();
  public filter: string = '';

  ngOnInit(): void {
    this.students$ = this.adminService.getAllStudents();
  }
  
  filterStudents() {
      this.students$ = this.adminService.getAllStudents().pipe(
        map(students => students.filter(
            (student: any) => student.nome.toLocaleLowerCase().includes(this.filter.toLocaleLowerCase())
          )
        )
      )
    }
}
