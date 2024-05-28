import { TranslationManager } from '../../../core/translation/TranslationManager';
import enUS from './en-US';
import es from './es-ES';
import ptBR from './pt-BR';

export const alertComponentTranslationManager = new TranslationManager()
  .setLanguage('pt-BR', ptBR)
  .setLanguage('en-US', enUS)
  .setLanguage('es-ES', es);
