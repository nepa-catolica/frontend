import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { take } from 'rxjs';
import { INotice } from '../../models/INotice';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  private http = inject(HttpClient);

  publishNotice(notice: FormData) {
    return this.http.post('/api/admin/api/edital/publicar', notice).pipe(take(1));
  }

  getAllNotices() {
    return this.http.get<INotice[]>('/api/admin/api/edital/exibir').pipe(take(1));
  }

  getNotice(slug: string) {
    return this.http.get(`/api/admin/api/edital/exibir/${slug}`, {
      responseType: 'blob',
    });
  }

  deleteNotice(id: number) {
    return this.http.delete(`/api/admin/api/edital/deletar/${id}`).pipe(take(1));
  }
}
