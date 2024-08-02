import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '../../models/IUser';
import { FormGroup } from '@angular/forms';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private http = inject(HttpClient);

  registerUser(user: FormGroup) {
    console.log(user)
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<IUser>(`/api/auth/api/register`, user, { headers }).pipe(take(1));
  }
}
