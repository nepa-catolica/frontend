import { LoginComponent } from '@/components/pages/login/login.component';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '@/services/login/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if (loginService.isLogged()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
