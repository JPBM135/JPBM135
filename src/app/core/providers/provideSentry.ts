import { APP_INITIALIZER, ErrorHandler } from '@angular/core';
import { Router } from '@angular/router';
import * as Sentry from '@sentry/angular';
import { environment } from '../../../environments/environment';

export function provideSentry() {
  return [
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: false,
        logErrors: !environment.isProduction,
      }),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      // eslint-disable-next-line unicorn/consistent-function-scoping
      useFactory: () => () => {},
      deps: [Sentry.TraceService],
      multi: true,
    },
  ];
}
