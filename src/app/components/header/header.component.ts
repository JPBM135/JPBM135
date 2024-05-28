import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { fromEvent } from 'rxjs';
import { TranslationLoaderService } from '../../core/services/translation/translation.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIconModule, TranslateModule, RouterModule, MatIconModule],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public headers = [
    { labelKey: 'HEADER.HOME', link: '/', icon: 'home' },
    { labelKey: 'HEADER.MY_COMPANY', link: '/my-company', icon: 'school' },
    { labelKey: 'HEADER.CLIENTS', link: '/clients', icon: 'school' },
  ];

  public SUPPORTED_LANGUAGES = [
    { label: 'Português', value: 'pt-BR' },
    { label: 'English', value: 'en-US' },
    { label: 'Español', value: 'es-ES' },
  ];

  public menuOpen = signal(false);

  public constructor(private readonly translationLoaderService: TranslationLoaderService) {
    fromEvent(document, 'click')
      .pipe(takeUntilDestroyed())
      .subscribe((event) => {
        if (
          event.target &&
          this.menuOpen() &&
          (event.target as HTMLElement).parentElement?.id !== 'header_menu'
        ) {
          this.menuOpen.set(false);
        }
      });
  }

  public toggleMenu(evt: Event): void {
    evt.stopPropagation();
    this.menuOpen.update((state) => !state);
  }

  public changeLanguage(): void {
    this.translationLoaderService.roundRobinLanguage();
  }
}
