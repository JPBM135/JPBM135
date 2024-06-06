import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslationManagerStore } from '../../translation/TranslationManagerStore';
import { AlertService } from '../alert/alert.service';
import type { SupportedLanguages, TranslationLanguageMap } from './translation.constants';

@Injectable({
  providedIn: 'root',
})
export class TranslationLoaderService {
  private translationService = inject(TranslateService);

  private alertService = inject(AlertService);

  public constructor() {
    const mergedLanguageMap = this.getTranslationManagers();

    this.translationService.setTranslation('en-US', mergedLanguageMap.get('en-US')!);
    this.translationService.setTranslation('pt-BR', mergedLanguageMap.get('pt-BR')!);
    this.translationService.setTranslation('es-ES', mergedLanguageMap.get('es-ES')!);

    const browserLanguage = navigator.language as SupportedLanguages;
    if ([...mergedLanguageMap.keys()].includes(browserLanguage)) {
      this.translationService.use(browserLanguage).subscribe(() => {});
    }
  }

  public getTranslationManagers(): TranslationLanguageMap {
    return TranslationManagerStore.getMergedLanguageMap();
  }

  public roundRobinLanguage(): void {
    const currentLanguage = this.translationService.currentLang ?? 'pt-BR';

    let newLanguage = currentLanguage;
    switch (currentLanguage) {
      case 'pt-BR':
        newLanguage = 'en-US';
        break;
      case 'en-US':
        newLanguage = 'es-ES';
        break;
      case 'es-ES':
        newLanguage = 'pt-BR';
        break;
      default:
        newLanguage = 'pt-BR';
        break;
    }

    this.translationService.use(newLanguage).subscribe(() => {
      this.alertService.showInfo(
        this.translationService.instant('HEADER.LANGUAGE_CHANGED', {
          lng: newLanguage,
        }),
      );
    });
  }
}
