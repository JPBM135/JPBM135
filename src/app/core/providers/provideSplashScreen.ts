import { ENVIRONMENT_INITIALIZER, inject } from '@angular/core';
import { SplashScreenService } from '../services/splash-screen/splash-screen.service';

export function provideSplashScreen() {
  return {
    provide: ENVIRONMENT_INITIALIZER,
    useValue: () => inject(SplashScreenService),
    multi: true,
  };
}
