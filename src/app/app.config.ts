import { provideHttpClient } from '@angular/common/http';
import {
  provideExperimentalZonelessChangeDetection,
  type ApplicationConfig,
  type EnvironmentProviders,
  type Provider,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  PreloadAllModules,
  provideRouter,
  withInMemoryScrolling,
  withPreloading,
} from '@angular/router';
import { routes } from './app.routes';
import { provideDateAdaptors } from './core/providers/provideDateAdaptors';
import { provideSentry } from './core/providers/provideSentry';
import { provideTranslation } from './core/providers/provideTranslation';
import { provideVercelSpeedInsights } from './core/providers/provideVercelSpeedInsights';

function createProviders(
  ...providers: (unknown[] | unknown)[]
): (EnvironmentProviders | Provider)[] {
  return providers.flat() as (EnvironmentProviders | Provider)[];
}

export const appConfig: ApplicationConfig = {
  providers: createProviders(
    provideSentry(),
    provideVercelSpeedInsights(),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideHttpClient(),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
    ),
    provideDateAdaptors(),
    provideExperimentalZonelessChangeDetection(),
    provideTranslation(),
  ),
};
