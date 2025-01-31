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
    data: {roles: ['professor']},
    loadComponent: () => import('./components/pages/projects/create-project/create-project.component').then((c) => c.CreateProjectComponent)
  },
  {
    path: 'projetos-aprovados',
    canActivate: [authGuard],
    loadComponent: () => import('./components/pages/projects/approved-projects/approved-projects.component').then((c) => c.ApprovedProjectsComponent)
  },
  {
    path: 'projetos-pendentes',
    canActivate: [authGuard, accessRouteGuard],
    data: {roles: ['Admin']},
    loadComponent: () => import('./components/pages/projects/outstanding-projects/outstanding-projects.component').then((c) => c.OutstandingProjectsComponent)
  },
  {
    path: 'meus-projetos',
    canActivate: [authGuard, accessRouteGuard],
    data: {roles: ['professor']},
    loadComponent: () => import('./components/pages/projects/projects-by-teachers/projects-by-teachers.component').then((c) => c.ProjectsByTeachersComponent)
  },
  {
    path: 'aprovar-professor',
    canActivate: [authGuard, accessRouteGuard],
    data: {roles: ['Admin']},
    loadComponent: () => import('./components/pages/coordinator/outstanding-teachers/outstanding-teachers.component').then((c) => c.OutstandingTeachersComponent)
  },
  {
    path: 'professores-aprovados',
    canActivate: [authGuard, accessRouteGuard],
    data: {roles: ['Admin']},
    loadComponent: () => import('./components/pages/coordinator/approved-teachers/approved-teachers.component').then((c) => c.ApprovedTeachersComponent)
  },
  {
    path: 'editar-projeto/:id',
    canActivate: [authGuard, accessRouteGuard],
    data: {roles: ['professor']},
    loadComponent: () => import('./components/pages/projects/edit-project/edit-project.component').then((c) => c.EditProjectComponent)
  },
  {
    path: 'alunos-inscritos-projeto/:id',
    canActivate: [authGuard, accessRouteGuard],
    data: {roles: ['professor']},
    loadComponent: () => import('./components/pages/projects/students-in-project/students-in-project.component').then((c) => c.StudentsInProjectComponent)
  },
  {
    path: 'publicar-edital',
    canActivate: [authGuard, accessRouteGuard],
    data: {roles: ['Admin']},
    loadComponent: () => import('./components/pages/notice/publish-notice/publish-notice.component').then((c) => c.PublishNoticeComponent)
  },
  {
    path: 'ver-editais',
    canActivate: [authGuard, accessRouteGuard],
    data: {roles: ['Admin', 'professor']},
    loadComponent: () => import('./components/pages/notice/notices/notices.component').then((c) => c.NoticesComponent)
  }


];
