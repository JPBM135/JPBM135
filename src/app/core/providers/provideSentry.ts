import { ErrorHandler } from '@angular/core';
import { Router } from '@angular/router';
import * as Sentry from '@sentry/angular-ivy';
import { environment } from '../../../environments/environment';

export function provideSentry() {
  return [
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: false,
        logErrors: environment.environment !== 'production',
      }),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
  ];
}
