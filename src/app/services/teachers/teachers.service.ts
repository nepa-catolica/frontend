import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { take } from 'rxjs';
import { ITeacher } from '@/models/ITeacher';
import { environment } from '@//enviroments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl;

  approveTeachers(teacherId: number) {
    return this.http.post(`${this.apiUrl}/admin/api/aprovar/professor/${teacherId}`, null).pipe(take(1));
  }

  failTeachers(teacherId: number) {
    return this.http.post(`${this.apiUrl}/admin/api/rejeitar/professor/${teacherId}`, null).pipe(take(1));
  }

  getTeachers() {
    return this.http.get<ITeacher[]>(`${this.apiUrl}/admin/api/lista/professores-aprovados`).pipe(take(1));
  }

  getOutstandingTeachers() {
    return this.http.get<ITeacher[]>(`${this.apiUrl}/admin/api/lista/professores-pendentes`).pipe(take(1));
  }
}
