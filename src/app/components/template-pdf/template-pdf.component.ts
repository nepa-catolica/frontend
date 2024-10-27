import { Component, Input } from '@angular/core';
import { IProject } from '../../models/IProject';

@Component({
  selector: 'app-template-pdf',
  standalone: true,
  imports: [],
  templateUrl: './template-pdf.component.html',
  styleUrl: './template-pdf.component.css'
})
export class TemplatePdfComponent {
  @Input({ required: true}) projectSelected?: IProject;
  @Input({ required: true }) toggleModal!: (project?: IProject) => void;
}
