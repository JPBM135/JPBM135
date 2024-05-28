import { TranslationManager } from '../../../core/translation/TranslationManager';
import enUS from './en';
import es from './es';
import ptBR from './pt-BR';

export const layoutTranslationManager = new TranslationManager()
  .setLanguage('pt-BR', ptBR)
  .setLanguage('en-US', enUS)
  .setLanguage('es-ES', es);
