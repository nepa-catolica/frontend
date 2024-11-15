import { NoticeService } from '@//app/services/notice/notice.service';
import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-publish-notice',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './publish-notice.component.html',
  styleUrl: './publish-notice.component.css'
})
export class PublishNoticeComponent {

  private router = inject(Router);
  private noticeService = inject(NoticeService);
  private toast = inject(ToastrService);
  private formBuilderService = inject(NonNullableFormBuilder);
  
  public form: FormGroup = this.formBuilderService.group({
    nome: ['', [Validators.required, Validators.minLength(5)]],
    descricao: ['', [Validators.required, Validators.minLength(5)]],
    arquivo_pdf: [null, Validators.required]
  });

  public selectedFile: File | null = null;

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.form.patchValue({ arquivo_pdf: this.selectedFile });
    }
  }

  publishNotice() {
    console.log(this.form)

    if (this.form.valid && this.selectedFile) {
      this.noticeService.publishNotice(this.form.value).subscribe(
        () => {
          this.toast.success('Edital publicado com sucesso!');
          this.router.navigate(['/home']);
        },
        (error) => this.toast.error(`${error.error.message}`)
      );
    }
  }
}
