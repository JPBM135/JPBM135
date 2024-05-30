import type { WritableSignal } from '@angular/core';

export type AlertComponentType = 'error' | 'info' | 'success' | 'warning';

export interface AlertComponentTheme {
  color: 'amber-400' | 'emerald-600' | 'red-600' | 'sky-600';
  icon: string;
}

export interface AlertCardInfo {
  id: string;
  message: string;
  progress?: number | null;
  theme: AlertComponentType;
  timeout: number;
}

export interface AlertCard {
  animationState: WritableSignal<string>;
  eta?: WritableSignal<string | null>;
  id: WritableSignal<string>;
  message: WritableSignal<string>;
  progress: WritableSignal<number | null>;
  theme: WritableSignal<AlertComponentType>;
  timeout: WritableSignal<number>;
}
