import type { AlertComponentTheme, AlertComponentType } from './alert.type';

export const AlertComponentThemes: Record<AlertComponentType, AlertComponentTheme> = {
  error: {
    icon: 'error_outline',
    color: 'red-600',
  },
  success: {
    icon: 'check_circle',
    color: 'emerald-600',
  },
  warning: {
    icon: 'error_outline',
    color: 'amber-400',
  },
  info: {
    icon: 'info',
    color: 'sky-600',
  },
};
