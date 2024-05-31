import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BackgroundWaveComponent } from '../../components/background-wave/background-wave.component';
import { LayoutComponent } from '../../components/layout/layout.component';
import { SeoService } from '../../core/services/seo/seo.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    CommonModule,
    LayoutComponent,
    BackgroundWaveComponent,
    RouterModule,
    MatIconModule,
    TranslateModule,
  ],
  templateUrl: './not-found.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {
  public constructor(private readonly seoService: SeoService) {
    this.seoService.setTags('NOT_FOUND_PAGE.META.TITLE', 'NOT_FOUND_PAGE.META.DESCRIPTION');
  }
}
