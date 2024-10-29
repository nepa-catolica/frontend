import { IProject } from '@//app/models/IProject';
import { ProjectService } from '@//app/services/project/project.service';
import { CommonModule, NgFor } from '@angular/common';
import { Component, inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-outstanding-projects',
  standalone: true,
  imports: [NgFor, CommonModule, FormsModule],
  templateUrl: './outstanding-projects.component.html',
  styleUrl: './outstanding-projects.component.css'
})
export class OutstandingProjectsComponent implements OnInit {
  private projectService = inject(ProjectService);
  private toast = inject(ToastrService);

  public projects$: Observable<IProject[]> = new Observable<IProject[]>();
  public filter: string = "";
  public isActive: boolean = false;
  public projectSelected?: IProject;

  @ViewChild('content', {static: false}) el!: ElementRef;

  ngOnInit(): void {
    this.projects$ = this.projectService.getAllOutstandingProjects();
  }

  printPDF(id: number) {
    this.projectService.getProjectById(id).subscribe(project => {
      const element = this.el.nativeElement;
  
      html2canvas(element).then(canvas => {
        const doc = new jsPDF('p', 'pt', 'a4', true);
        const imgData = canvas.toDataURL('image/png');
        const a4Width = 595;
        const a4Height = 842;
        const imgWidth = a4Width;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
  
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= a4Height; 
  
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= a4Height;
        }
  
        doc.save(`${project.titulo}.pdf`);
      });
    });
  }

  approveProject(id: number) {
    this.projectService.approveProjects(id).pipe(
      switchMap(() => {
        this.toast.success("Projeto aprovado com sucesso!");
        return this.projectService.getAllOutstandingProjects();
      }),
      catchError((error) => {
        this.toast.error("Erro ao aprovar projeto!");
        return of([]);
      })
    ).subscribe((projects) => {
      this.projects$ = of(projects);
    });
  }

  reproveProject(id: number) {
    this.projectService.failProjects(id).pipe(
      switchMap(() => {
        this.toast.error("Projeto rejeitado!");
        return this.projectService.getAllOutstandingProjects();
      })
    ).subscribe((projects) => {
      this.projects$ = of(projects);
    })
  }

  toggleModal(project?: IProject) {
    this.projectSelected = project;
    this.isActive = !this.isActive;
  }

  filterProjects() {
    this.projects$ = this.projectService.getAllOutstandingProjects().pipe(
      map(
        (projects: IProject[]) => projects.filter(
          (project: IProject) => project.titulo.toLocaleLowerCase().includes(this.filter.toLocaleLowerCase())
        )
      )
    )
  }
}
