import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoginService } from '@/services/login/login.service';

export const authInterceptorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const loginService = inject(LoginService);
  const token = loginService.getToken();

  if (token && !loginService.isTokenExpired(token)) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token
      },
    });
    return next(authReq);
  }
  
  return next(req);
};