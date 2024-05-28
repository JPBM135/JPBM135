import { TranslationManager } from '../../../translation/TranslationManager';
import enUS from './en-US';
import es from './es-ES';
import ptBR from './pt-BR';

export const alertServiceTranslationManager = new TranslationManager()
  .setLanguage('pt-BR', ptBR)
  .setLanguage('en-US', enUS)
  .setLanguage('es-ES', es);
