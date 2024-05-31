import { provideHttpClient } from '@angular/common/http';
import type { ApplicationConfig, EnvironmentProviders, Provider } from '@angular/core';
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

function createProviders(
  ...providers: (unknown[] | unknown)[]
): (EnvironmentProviders | Provider)[] {
  return providers.flat() as (EnvironmentProviders | Provider)[];
}

export const appConfig: ApplicationConfig = {
  providers: createProviders(
    provideSentry(),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideHttpClient(),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
    ),
    provideDateAdaptors(),

    provideTranslation(),
  ),
};
