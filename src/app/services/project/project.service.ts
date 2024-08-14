import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  http = inject(HttpClient);

  createProject(project: FormGroup) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('api/projetos/api/create', project, {headers}).pipe(take(1));
  }
}
