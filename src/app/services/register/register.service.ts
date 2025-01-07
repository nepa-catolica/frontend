import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '@/models/IUser';
import { FormGroup } from '@angular/forms';
import { take } from 'rxjs';
import { environment } from '@//enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl;

  createUser(user: FormGroup) {
    return this.http.post<IUser>(`${this.apiUrl}/auth/api/register`, user).pipe(take(1));
  }
}
