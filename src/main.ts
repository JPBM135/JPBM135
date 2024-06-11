// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import * as Sentry from '@sentry/angular';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { environment } from './environments/environment';

Sentry.init({
  dsn: environment.sentryDSN ?? undefined,
  integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
  tracesSampleRate: 0.5,
  tracePropagationTargets: ['localhost'],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 0.8,
});

bootstrapApplication(AppComponent, appConfig).catch((error) => console.error(error));
