import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import * as Sentry from '@sentry/angular';

Sentry.init({
  dsn: "https://d04ae6aea34787eac3f9eed6f6230ef4@o4509079136960512.ingest.us.sentry.io/4509079138729984",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
})

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
