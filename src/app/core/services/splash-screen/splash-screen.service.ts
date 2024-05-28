import { Inject, Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SplashScreenService {
  public constructor(@Inject(Router) private readonly router: Router) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        take(1),
      )
      .subscribe(() => {
        const splashScreen = document.querySelector('#splash-screen');
        if (splashScreen) {
          splashScreen.remove();
        }
      });
  }
}
