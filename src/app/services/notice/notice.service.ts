import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { take } from 'rxjs';
import { INotice } from '../../models/INotice';
import { environment } from '@//enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl;

  publishNotice(notice: FormData) {
    return this.http.post(`${this.apiUrl}/admin/api/edital/publicar`, notice).pipe(take(1));
  }

  getAllNotices() {
    return this.http.get<INotice[]>(`${this.apiUrl}/admin/api/edital/exibir`).pipe(take(1));
  }

  getNotice(slug: string) {
    return this.http.get(`${this.apiUrl}/admin/api/edital/exibir/${slug}`, {
      responseType: 'blob',
    });
  }

  deleteNotice(id: string) {
    return this.http.delete(`${this.apiUrl}/admin/api/edital/deletar/${id}`).pipe(take(1));
  }
}
