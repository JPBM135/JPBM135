import { Injectable } from '@angular/core';
import { inject as injectAnalytics } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SpeedInsightsService {
  public constructor() {
    injectAnalytics({
      debug: !environment.isProduction,
      framework: 'angular',
    });
    injectSpeedInsights({
      debug: !environment.isProduction,
      framework: 'angular',
    });
  }
}
