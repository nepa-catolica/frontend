import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IAuth } from '../../models/IAuth';
import { take } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private http = inject(HttpClient);
  private router = inject(Router)

  login(user: FormGroup) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<IAuth>(`/api/auth/api/login`, user, { headers }).subscribe(
      (res) => {
        if (res && res.access_token != null) {
          const token = res.access_token;
          localStorage.setItem('token', token);
          this.router.navigate(['/']);
        }
      }
    );
  }

  getToken() {
    const token = localStorage.getItem('token');

    if (token != null) {
      return token;
    }

    return null;
  }

  isLogged(): boolean {
    const token = localStorage.getItem('token');
    if (token != null) {
      return true;
    }

    return false;
  }
}
