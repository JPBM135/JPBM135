import { APP_INITIALIZER, type Provider } from '@angular/core';
import { SpeedInsightsService } from '../services/speed-insights/speed-insights.service';

export function provideVercelSpeedInsights(): Provider[] {
  return [
    {
      provide: APP_INITIALIZER,
      // eslint-disable-next-line unicorn/consistent-function-scoping
      useFactory: () => () => {},
      deps: [SpeedInsightsService],
      multi: true,
    },
  ];
}
