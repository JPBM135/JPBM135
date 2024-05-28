import {
  DEFAULT_LANGUAGE_MAP,
  type SupportedLanguages,
  type TranslationLanguageMap,
} from '../services/translation/translation.constants';

export class TranslationManager {
  private languageMap: TranslationLanguageMap = new Map(DEFAULT_LANGUAGE_MAP);

  public setLanguage(language: SupportedLanguages, translations: Record<string, unknown>): this {
    this.languageMap.set(language, translations);
    return this;
  }

  public getLanguage(language: SupportedLanguages): Record<string, unknown> {
    return this.languageMap.get(language) ?? {};
  }

  public getLanguageMap(): TranslationLanguageMap {
    return this.languageMap;
  }
}
