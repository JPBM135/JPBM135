import { TranslationManager } from '../../../translation/TranslationManager';
import enUS from './en';
import es from './es';
import ptBR from './pt-BR';

export const errorHandlerTranslationManager = new TranslationManager()
  .setLanguage('pt-BR', ptBR)
  .setLanguage('en-US', enUS)
  .setLanguage('es-ES', es);
