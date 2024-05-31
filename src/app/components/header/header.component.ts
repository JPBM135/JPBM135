import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { menuSlide } from '../../core/animations/menuSlide';
import { DarkModeService } from '../../core/services/dark-mode/dark-mode.service';
import { KonamiCodeService } from '../../core/services/konami-code/konami-code.service';
import { TranslationLoaderService } from '../../core/services/translation/translation.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    TranslateModule,
    RouterModule,
    MatIconModule,
    MatTooltipModule,
  ],
  animations: [menuSlide],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public headers = [
    { labelKey: 'HEADER.HOME', link: '/', icon: 'home' },
    { labelKey: 'HEADER.PROJECTS', link: '/projects', icon: 'hub' },
    { labelKey: 'HEADER.ABOUT_ME', link: '/about-me', icon: 'frame_person' },
  ];

  public SUPPORTED_LANGUAGES = [
    { label: 'Português', value: 'pt-BR' },
    { label: 'English', value: 'en-US' },
    { label: 'Español', value: 'es-ES' },
  ];

  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  public currentRoute = this.activatedRoute.snapshot.url[0]?.path || '/';

  public isMenuOpen = signal(false);

  public constructor(
    private readonly translationLoaderService: TranslationLoaderService,
    public readonly darkModeService: DarkModeService,
    public readonly activatedRoute: ActivatedRoute,
    public readonly konamiCodeService: KonamiCodeService,
    public readonly router: Router,
  ) {
    console.log('HeaderComponent.constructor()', this.currentRoute);

    this.activatedRoute.url.pipe(takeUntilDestroyed()).subscribe((url) => {
      this.currentRoute = url[0]?.path ?? '/';
    });

    this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isMenuOpen.set(false);
      }
    });
  }

  public toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }

  public changeLanguage(): void {
    this.translationLoaderService.roundRobinLanguage();
  }

  public toggleMenu(): void {
    this.isMenuOpen.update((value) => !value);
  }
}
