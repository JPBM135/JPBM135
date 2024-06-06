import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  signal,
  type AfterViewInit,
  type WritableSignal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DarkModeService } from '../../../../core/services/dark-mode/dark-mode.service';
import {
  ProjectType,
  type Project,
} from '../../../../core/services/data-fetcher/data-fetcher.type';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, TranslateModule],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardComponent implements AfterViewInit {
  @Input({
    required: true,
  })
  public project!: Project;

  public localizedProject: WritableSignal<Project | null> = signal(null);

  public classByType = signal('product-card__box--other');

  public constructor(
    private readonly translateService: TranslateService,
    public darkModeService: DarkModeService,
  ) {
    this.translateService.onLangChange.subscribe((event) => {
      this.localizeProject(event.lang);
    });
  }

  public ngAfterViewInit(): void {
    this.classByType.set(this.getProjectTypeClass());
    this.localizeProject(this.translateService.currentLang);
  }

  private localizeProject(lang: string): void {
    const overrides = this.project.localizations?.find(
      (localization) => localization.language === lang,
    );

    this.localizedProject.set({
      ...this.project,
      ...overrides,
    });
  }

  private getProjectTypeClass(): string {
    switch (this.project.type) {
      case ProjectType.Backend:
        return 'product-card__box--back';
      case ProjectType.Frontend:
        return 'product-card__box--front';
      case 'fullstack':
        return 'product-card__box--fullstack';
      default:
        return 'product-card__box--other';
    }
  }
}
