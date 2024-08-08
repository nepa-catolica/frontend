import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IAuth } from '../../models/IAuth';
import { catchError, of, take, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ISubToken } from '../../models/ISubToken';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private http = inject(HttpClient);
  private router = inject(Router);
  private toast = inject(ToastrService);

  login(user: FormGroup) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<IAuth>(`/api/auth/api/login`, user, { headers }).pipe(
      tap(res => {
        if (res && res.access_token) {
          this.toast.success('Login realizado com sucesso!')
          localStorage.setItem('token', res.access_token);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.error('Falha no login: usuário não foi aprovado!');
          this.toast.error('Falha no login: usuário não foi aprovado!');
          return of(null);
        }
        return throwError(() => error);
      })
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

  getExpirationToken(token: string) {
    const decoded = jwtDecode(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);

    return date;
  }

  isTokenExpired(token: string) {
    if (!token) {
      return true;
    }

    const date = this.getExpirationToken(token);
    if (date === null || date === undefined) {
      return false;
    }

    return !(date.valueOf() > new Date().valueOf());
  }

  decodeToken(): ISubToken {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        return {
          email: decoded.sub.email || '',
          role: decoded.sub.role || ''
        };
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
    return { email: '', role: '' };
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
