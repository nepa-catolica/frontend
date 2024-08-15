import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';

export const accessRouteGuard: CanActivateFn = (route, state) => {

  const loginService = inject(LoginService);
  const router = inject(Router);

  const access = route.data['roles'];
  const permissions = loginService.decodeToken();

  if (permissions.role === 'admin' || permissions.role === 'Professor') {
    return true;
  }

  return false;
};
