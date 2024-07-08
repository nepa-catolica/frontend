import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-btn-login-register',
  standalone: true,
  imports: [],
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.css'
})
export class ButtonLoginRegisterComponent {
  @Input() text: string = "";
}
