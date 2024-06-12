import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  signal,
  type AfterViewInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { delay, fromEvent, merge } from 'rxjs';
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
export class HomeComponent implements AfterViewInit {
  public static PIPE_ADD_INTERVAL = 750;

  public static PIPE_LAYOUT_SHIFT_THRESHOLD = 30;

  public static PIPE_LAYOUT_SHIFT_MULTILINE_MULTIPLIER = 1.75;

  @ViewChild('amITitle') public amITitle!: ElementRef<HTMLHeadingElement>;

  @ViewChild('amITitleText') public amITitleText!: ElementRef<HTMLSpanElement>;

  public readonly SKILLS = SKILLS;

  @ViewChild('courses') public coursesDiv!: ElementRef<HTMLDivElement>;

  public pipeCount = signal(0);

  public textMultiline = signal(false);

  private intervalId: ReturnType<typeof setInterval> | null = null;

  public constructor(
    public readonly dataFetcherService: DataFetcherService,
    public readonly seoService: SeoService,
    public readonly translateService: TranslateService,
  ) {
    this.seoService.setTags('HOME_PAGE.META.TITLE', 'HOME_PAGE.META.DESCRIPTION');

    merge(fromEvent(window, 'resize'), translateService.onLangChange.asObservable())
      .pipe(delay(100), takeUntilDestroyed())
      .subscribe(() => {
        const canAnimate = this.validatePipeLayoutShift();

        if (canAnimate) {
          this.animatePipeCount();
        }

        if (this.intervalId && !canAnimate) {
          clearInterval(this.intervalId);
          this.intervalId = null;
          this.pipeCount.set(0);
        }
      });
  }

  public ngAfterViewInit(): void {
    const canAnimate = this.validatePipeLayoutShift();

    if (canAnimate) {
      this.animatePipeCount();
    }
  }

  public validatePipeLayoutShift(): boolean {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    const parentRect = this.amITitle.nativeElement.getBoundingClientRect();
    const textFontSize = window.getComputedStyle(this.amITitle.nativeElement).fontSize;

    this.textMultiline.set(
      Number.parseFloat(textFontSize) * HomeComponent.PIPE_LAYOUT_SHIFT_MULTILINE_MULTIPLIER <
        parentRect.height,
    );

    if (!this.amITitle) {
      return false;
    }

    if (this.textMultiline()) {
      return true;
    }

    const textSize = this.amITitleText.nativeElement.offsetWidth;

    return parentRect.width - textSize > HomeComponent.PIPE_LAYOUT_SHIFT_THRESHOLD;
  }

  public animatePipeCount(): void {
    this.intervalId = setInterval(() => {
      this.pipeCount.update((value) => {
        return value === 1 ? 0 : value + 1;
      });
    }, HomeComponent.PIPE_ADD_INTERVAL);
  }

  public scrollToCourses(): void {
    if (!this.coursesDiv?.nativeElement) {
      return;
    }

    this.coursesDiv.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
