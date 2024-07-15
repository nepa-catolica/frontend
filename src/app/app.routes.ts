import { Routes } from '@angular/router';
import { authGuard } from './guards/authGuard/auth.guard';

export const routes: Routes = [
  {
    path: 'cadastro',
    loadComponent: () => import('./components/pages/register/register.component').then((c) => c.RegisterComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./components/pages/login/login.component').then((c) => c.LoginComponent)
  }
];
