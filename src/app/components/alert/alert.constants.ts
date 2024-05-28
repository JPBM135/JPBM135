import type { AlertComponentTheme, AlertComponentType } from './alert.type';

export const AlertComponentThemes: Record<AlertComponentType, AlertComponentTheme> = {
  error: {
    icon: 'error_outline',
    color: 'negative-icon-default',
  },
  success: {
    icon: 'check_circle',
    color: 'positive-icon-default',
  },
  warning: {
    icon: 'error_outline',
    color: 'warning-icon-default',
  },
  info: {
    icon: 'info',
    color: 'info-icon-default',
  },
};
