import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { take } from 'rxjs';
import { IProject } from '@/models/IProject';
import { IUser } from '../../models/IUser';
import { environment } from '@//enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl;

  createProject(project: FormGroup) {
    return this.http.post(`${this.apiUrl}/projetos/api/create`, project).pipe(take(1));
  }

  getProjectById(projectId: number) {
    return this.http.get<IProject>(`${this.apiUrl}/projetos/api/listar/projeto/${projectId}`).pipe(take(1));
  }

  getAllApprovedProjects() {
    return this.http.get<IProject[]>(`${this.apiUrl}/projetos/api/listar/projetos_aprovados`).pipe(take(1));
  }

  getAllOutstandingProjects() {
    return this.http.get<IProject[]>(`${this.apiUrl}/projetos/api/listar/projetos_pendentes`).pipe(take(1));
  }

  approveProjects(projectId: number) {
    return this.http.post(`${this.apiUrl}/admin/api/aprovar/projeto/${projectId}`, null).pipe(take(1));
  }

  failProjects(projectId: number) {
    return this.http.post(`${this.apiUrl}/admin/api/rejeitar/projeto/${projectId}`, null).pipe(take(1));
  }

  editProject(id: number, project: FormGroup) {
    return this.http.put(`${this.apiUrl}/projetos/api/editar/projeto/${id}`, project).pipe(take(1));
  }

  studentRegistrationInTheProject(idProject: number) {
    return this.http.post(`${this.apiUrl}/projetos/api/register/aluno_projeto/${idProject}`, null).pipe(take(1));
  }

  getAllStudentsRegisteredInTheProject(idProject: number) {
    return this.http.get<IUser[]>(`${this.apiUrl}/projetos/api/projeto/${idProject}/alunos`).pipe(take(1));1
  }

  approveStudentInProject(idProject: number, idStudent: number) {
    return this.http.post(`${this.apiUrl}/projetos/api/aprovar/${idProject}/aluno/${idStudent}`, null).pipe(take(1));
  }

  reproveStudentInProject(idProject:number, idStudent: number) {
    return this.http.post(`${this.apiUrl}/projetos/api/projeto/${idProject}/aluno/${idStudent}/rejeitar`, null).pipe(take(1));
  }

}
