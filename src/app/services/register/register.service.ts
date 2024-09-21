import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '@/models/IUser';
import { FormGroup } from '@angular/forms';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private http = inject(HttpClient);

  createUser(user: FormGroup) {
    return this.http.post<IUser>(`/api/auth/api/register`, user).pipe(take(1));
  }
}
