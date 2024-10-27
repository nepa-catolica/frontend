import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { catchError, of, take, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ISubToken } from '@/models/ISubToken';
import { IAuth } from '@/models/IAuth';
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
    return this.http.post<IAuth>(`/api/auth/api/login`, user).pipe(
      tap(res => {
        if (res.access_token.msg === "Credenciais inválidas") {
          this.toast.error('Usuário e/ou senha incorretos!');
        }
        if (res && res.access_token && res.access_token.access_token) {
          this.toast.success('Login realizado com sucesso!')
          localStorage.setItem('token', res.access_token.access_token);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error)
        if (error.status === 401) {
          if (error.error.msg === "Credenciais inválidas") {
            this.toast.error('Usuário e/ou senha incorretos!');
          } else {
            this.toast.error('Falha no login: usuário não foi aprovado!');
          }
          return of(null);
        }
        return throwError(() => error);
      })
    );
  }

  getToken() {
    const token = localStorage.getItem('token');
    if (token && !this.isTokenExpired(token)) {
      return token;
    }

    this.logout();
    return null;
  }

  isLogged(): boolean {
    const token = this.getToken();
    return token != null;
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
