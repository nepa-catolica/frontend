import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { take } from 'rxjs';
import { IProject } from '@/models/IProject';
import { IUser } from '../../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private http = inject(HttpClient);

  createProject(project: FormGroup) {
    return this.http.post('api/projetos/api/create', project).pipe(take(1));
  }

  getProjectById(projectId: number) {
    return this.http.get<IProject>(`api/projetos/api/listar/projeto/${projectId}`).pipe(take(1));
  }

  getAllApprovedProjects() {
    return this.http.get<IProject[]>('api/projetos/api/listar/projetos_aprovados').pipe(take(1));
  }

  getAllOutstandingProjects() {
    return this.http.get<IProject[]>('api/projetos/api/listar/projetos_pendentes').pipe(take(1));
  }

  approveProjects(projectId: number) {
    return this.http.post(`/api/admin/api/aprovar/projeto/${projectId}`, null).pipe(take(1));
  }

  failProjects(projectId: number) {
    return this.http.post(`/api/admin/api/rejeitar/projeto/${projectId}`, null).pipe(take(1));
  }

  editProject(id: number, project: FormGroup) {
    return this.http.put(`api/projetos/api/editar/projeto/${id}`, project).pipe(take(1));
  }

  studentRegistrationInTheProject(idProject: number) {
    return this.http.post(`api/projetos/api/register/aluno_projeto/${idProject}`, null).pipe(take(1));
  }

  getAllStudentsRegisteredInTheProject(idProject: number) {
    return this.http.get<IUser[]>(`api/projetos/api/projeto/${idProject}/alunos`).pipe(take(1));1
  }

  approveStudentInProject(idProject: number, idStudent: number) {
    return this.http.post(`api/projetos/api/aprovar/${idProject}/aluno/${idStudent}`, null).pipe(take(1));
  }

  reproveStudentInProject(idProject:number, idStudent: number) {
    return this.http.post(`api/projetos/api/projeto/${idProject}/aluno/${idStudent}/rejeitar`, null).pipe(take(1));
  }

}
