import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { take } from 'rxjs';
import { IProject } from '@/models/IProject';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private http = inject(HttpClient);

  createProject(project: FormGroup) {
    return this.http.post('api/projetos/api/create', project).pipe(take(1));
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
}
