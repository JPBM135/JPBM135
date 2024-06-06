import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { BackgroundWaveComponent } from '../../components/background-wave/background-wave.component';
import { LayoutComponent } from '../../components/layout/layout.component';
import { SeoService } from '../../core/services/seo/seo.service';
import { TimelineCardComponent } from './components/timeline-card/timeline-card.component';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [
    CommonModule,
    LayoutComponent,
    BackgroundWaveComponent,
    TranslateModule,
    MatIconModule,
    TimelineCardComponent,
  ],
  templateUrl: './about-me.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutMeComponent {
  public constructor(private readonly seoService: SeoService) {
    this.seoService.setTags('ABOUT_ME_PAGE.META.TITLE', 'ABOUT_ME_PAGE.META.DESCRIPTION');
  }
}
