export type SupportedLanguages = 'en-US' | 'es-ES' | 'pt-BR';

export type TranslationLanguageMap = Map<SupportedLanguages, Record<string, unknown>>;

export const DEFAULT_LANGUAGE_MAP: [SupportedLanguages, Record<string, unknown>][] = [
  ['en-US', {}],
  ['es-ES', {}],
  ['pt-BR', {}],
];
