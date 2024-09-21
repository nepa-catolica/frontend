import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '@/services/login/login.service';

export const accessRouteGuard: CanActivateFn = (route, state) => {

  const loginService = inject(LoginService);
  const router = inject(Router);

  const access = route.data['roles'];
  const permissions = loginService.decodeToken();

  if (permissions.role === 'Admin' || permissions.role === 'professor') {
    return true;
  }

  return false;
};
