import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { BackgroundWaveComponent } from '../../components/background-wave/background-wave.component';
import { DiscordCardComponent } from '../../components/discord-card/discord-card.component';
import { LayoutComponent } from '../../components/layout/layout.component';
import { SkillTagComponent } from '../../components/skill-tag/skill-tag.component';
import { DataFetcherService } from '../../core/services/data-fetcher/data-fetcher.service';
import { SeoService } from '../../core/services/seo/seo.service';
import { SKILLS } from './home.constants';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    LayoutComponent,
    BackgroundWaveComponent,
    TranslateModule,
    MatIconModule,
    SkillTagComponent,
    DiscordCardComponent,
  ],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  public static DOT_ADD_INTERVAL = 750;

  public readonly SKILLS = SKILLS;

  @ViewChild('courses') public coursesDiv!: ElementRef<HTMLDivElement>;

  public dotCount = signal(0);

  public constructor(
    public readonly dataFetcherService: DataFetcherService,
    public readonly seoService: SeoService,
  ) {
    this.seoService.setTags('HOME_PAGE.META.TITLE', 'HOME_PAGE.META.DESCRIPTION');

    setInterval(() => {
      this.dotCount.update((value) => {
        return value === 1 ? 0 : value + 1;
      });
    }, HomeComponent.DOT_ADD_INTERVAL);
    // const github = 'https://github.com/JPBM135';
  }

  public scrollToCourses(): void {
    if (!this.coursesDiv?.nativeElement) {
      return;
    }

    this.coursesDiv.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
