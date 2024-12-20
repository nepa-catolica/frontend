import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NgIf } from '@angular/common';
import { LoginService } from './services/login/login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  loginService = inject(LoginService);
  authGuard = inject(LoginService);
  router = inject(Router);

  ngOnInit(): void {
    initFlowbite();
  }

  isLoginPage(): boolean {
    return this.router.url === '/login' || this.router.url === '/cadastro';
  }

  logoutPage(): void {
    const token = this.loginService.getToken();

    if (this.loginService.isTokenExpired(token!)) {
      window.localStorage.removeItem("token");
    }
  }
}
