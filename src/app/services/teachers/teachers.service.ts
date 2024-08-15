import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { take } from 'rxjs';
import { ITeacher } from '../../models/ITeacher';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  http = inject(HttpClient);

  approveTeachers(teacherId: number) {
    return this.http.post(`/api/admin/api/aprovar/professor/${teacherId}`, null).pipe(take(1));
  }

  failTeachers(teacherId: number) {
    return this.http.post(`/api/admin/api/rejeitar/professor/${teacherId}`, null).pipe(take(1));
  }

  getTeachers() {
    return this.http.get<ITeacher[]>(`/api/admin/api/lista/professores-aprovados`).pipe(take(1));
  }

  getOutstandingTeachers() {
    return this.http.get<ITeacher[]>(`/api/admin/api/lista/professores-pendentes`).pipe(take(1));
  }
}
