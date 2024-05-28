import { alertComponentTranslationManager } from '../../components/alert/i18n';
import { headerTranslationManager } from '../../components/header/i18n';
import { layoutTranslationManager } from '../../components/layout/i18n';
import { rootTranslationManager } from '../../i18n';
import { homePageTranslationManager } from '../../pages/home/i18n';
import { alertServiceTranslationManager } from '../services/alert/i18n';
import { errorHandlerTranslationManager } from '../services/error-handler/i18n';
import {
  DEFAULT_LANGUAGE_MAP,
  type SupportedLanguages,
  type TranslationLanguageMap,
} from '../services/translation/translation.constants';
import { mergeDeep } from '../utils/mergeDeep';
import type { TranslationManager } from './TranslationManager';

export class TranslationManagerStore {
  public static MANAGERS: TranslationManager[] = [
    alertComponentTranslationManager,
    alertServiceTranslationManager,
    rootTranslationManager,
    layoutTranslationManager,
    headerTranslationManager,
    homePageTranslationManager,
    errorHandlerTranslationManager,
  ];

  public static getMergedLanguageMap(): TranslationLanguageMap {
    const languageMap = new Map<SupportedLanguages, Record<string, unknown>>(DEFAULT_LANGUAGE_MAP);

    for (const manager of TranslationManagerStore.MANAGERS) {
      for (const [language, translations] of manager.getLanguageMap()) {
        const mergedTranslations = mergeDeep(languageMap.get(language) ?? {}, translations);
        languageMap.set(language, mergedTranslations);
      }
    }

    return Object.freeze(languageMap);
  }
}
