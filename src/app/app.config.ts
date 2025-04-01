import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideToastr } from 'ngx-toastr';
import { authInterceptorInterceptor } from './interceptors/auth-interceptor.interceptor';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import * as Sentry from '@sentry/angular';
import { BrowserTracing } from '@sentry/tracing';
import { ErrorHandler } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    HttpClientModule,
    provideRouter(routes),
    provideHttpClient(),
    provideHttpClient(withInterceptors([
      authInterceptorInterceptor
    ])),
    provideAnimations(),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    provideEnvironmentNgxMask(),
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: false,
      })
    },
    Sentry.TraceService,
  ]
};
