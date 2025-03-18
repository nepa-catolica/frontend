import { environment } from '@//environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { IUser } from '../../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class ManageUsersService {
  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl;

  getAllStudents(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.apiUrl}/admin/api/alunos`).pipe(take(1));
  }

  getTeacher(id: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/admin/api/professor/${id}/detalhes`).pipe(take(1));
  }

  getStudent(id: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/admin/api/aluno/${id}/detalhes`).pipe(take(1));
  }

  changePasswordTeacher(id: string, passwordData: { password: string }): Observable<IUser> {
    return this.http.put<IUser>(`${this.apiUrl}/admin/api/professor/${id}/senha/`, passwordData).pipe(take(1));
  }

  changePasswordStudent(id: string, passwordData: { password: string }): Observable<IUser> {
    return this.http.put<IUser>(`${this.apiUrl}/admin/api/aluno/${id}/senha`, passwordData).pipe(take(1));
  }
}
