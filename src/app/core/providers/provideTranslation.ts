import type { EnvironmentProviders, Provider } from '@angular/core';
import { ENVIRONMENT_INITIALIZER, importProvidersFrom, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationLoaderService } from '../services/translation/translation.service';

export function provideTranslation(): (EnvironmentProviders | Provider)[] {
  return [
    {
      provide: ENVIRONMENT_INITIALIZER,
      useValue: () => inject(TranslationLoaderService),
      multi: true,
    },
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'pt-BR',
        useDefaultLang: true,
      }),
    ),
  ];
}
