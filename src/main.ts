// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import * as Sentry from '@sentry/angular-ivy';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { environment } from './environments/environment';

Sentry.init({
  dsn: environment.sentryDSN ?? undefined,
  integrations: [
    Sentry.browserTracingIntegration({
      tracePropagationTargets: ['localhost', /.*execute-api\.sa-east-1\.amazonaws.com.*/i],
    }),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 0.01,
  replaysSessionSampleRate: 0.001,
  replaysOnErrorSampleRate: 0.1,
});

bootstrapApplication(AppComponent, appConfig).catch((error) => console.error(error));
