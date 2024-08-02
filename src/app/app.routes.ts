import { Routes } from '@angular/router';
import { authGuard } from './guards/authGuard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'cadastro',
    loadComponent: () => import('./components/pages/register/register.component').then((c) => c.RegisterComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./components/pages/login/login.component').then((c) => c.LoginComponent)
  },
  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () => import('./components/pages/homepage/homepage.component').then((c) => c.HomepageComponent)
  }
];
