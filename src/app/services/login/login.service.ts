import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IAuth } from '../../models/IAuth';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private http = inject(HttpClient);

  login(user: FormGroup) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<IAuth>(`/api/auth/api/login`, user, { headers }).pipe(take(1));
  }
}
