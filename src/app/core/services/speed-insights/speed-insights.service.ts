import { Injectable } from '@angular/core';
import { injectSpeedInsights } from '@vercel/speed-insights';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SpeedInsightsService {
  public constructor() {
    injectSpeedInsights({
      debug: !environment.isProduction,
      framework: 'angular',
    });
  }
}
