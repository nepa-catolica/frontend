import { Routes } from '@angular/router';
import { authGuard } from './guards/authGuard/auth.guard';
import { accessRouteGuard } from './guards/access-route/access-route.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
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
  },
  {
    path: 'criar-projeto',
    canActivate: [authGuard, accessRouteGuard],
    data: {roles: ['admin', 'professor']},
    loadComponent: () => import('./components/pages/projects/create-project/create-project.component').then((c) => c.CreateProjectComponent)
  },
  {
    path: 'aprovar-professor',
    canActivate: [authGuard, accessRouteGuard],
    data: {roles: ['admin']},
    loadComponent: () => import('./components/pages/coordinator/outstanding-teachers/outstanding-teachers.component').then((c) => c.OutstandingTeachersComponent)
  },
  {
    path: 'professores-aprovados',
    canActivate: [authGuard, accessRouteGuard],
    data: {roles: ['admin']},
    loadComponent: () => import('./components/pages/coordinator/approved-teachers/approved-teachers.component').then((c) => c.ApprovedTeachersComponent)
  }
];
