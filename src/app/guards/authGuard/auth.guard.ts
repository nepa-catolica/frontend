import { LoginComponent } from './../../components/pages/login/login.component';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  const token = loginService.getToken();

  if (loginService.isLogged()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
