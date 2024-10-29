import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  private http = inject(HttpClient);

  publishNotice(notice: FormGroup) {
    return this.http.post('/api/admin/api/publicar/edital', notice).pipe(take(1));
  }
}
