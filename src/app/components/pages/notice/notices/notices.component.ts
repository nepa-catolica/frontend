import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { INotice } from '@//app/models/INotice';
import { NoticeService } from '@//app/services/notice/notice.service';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '@//app/services/login/login.service';
import { ISubToken } from '@//app/models/ISubToken';

@Component({
  selector: 'app-notices',
  standalone: true,
  imports: [NgFor, CommonModule, FormsModule],
  templateUrl: './notices.component.html',
  styleUrl: './notices.component.css'
})
export class NoticesComponent implements OnInit {

  private noticeService = inject(NoticeService);
  private toast = inject(ToastrService);
  private loginService = inject(LoginService);

  public notices$: Observable<INotice[]> = new Observable<INotice[]>();
  public filter: string = "";
  public subToken: ISubToken | null = null;

  ngOnInit(): void {
    this.subToken = this.loginService.decodeToken();
    console.log(this.subToken)
    this.notices$ = this.noticeService.getAllNotices();
  }

  openNoticePDF(slug: string) {
    this.noticeService.getNotice(slug).subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    }, (error) => {
      this.toast.error("Não foi possível abrir o edital.");
    });
  }

  displayNotice(slug: string) {
    this.noticeService.getNotice(slug).subscribe();
  }
  deleteNotice(id: number) {
    this.noticeService.deleteNotice(id).pipe(
      switchMap(() => {
        this.toast.error("Edital excluído com sucesso!");
        return this.noticeService.getAllNotices();
      })
    ).subscribe((notices) => {
      this.notices$ = of(notices);
    })
  }

  filterNotices() {
    this.notices$ = this.noticeService.getAllNotices().pipe(
      map(
        (notices: INotice[]) => notices.filter(
          (notice: INotice) => notice.nome.toLocaleLowerCase().includes(this.filter.toLocaleLowerCase())
        )
      )
    )
  }
}
