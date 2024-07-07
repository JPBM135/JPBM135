import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';
import { BackgroundWaveComponent } from '../../components/background-wave/background-wave.component';
import { LayoutComponent } from '../../components/layout/layout.component';
import { AlertService } from '../../core/services/alert/alert.service';
import { DataFetcherService } from '../../core/services/data-fetcher/data-fetcher.service';
import { SeoService } from '../../core/services/seo/seo.service';

@Component({
  selector: 'app-pgp-key',
  standalone: true,
  imports: [CommonModule, LayoutComponent, BackgroundWaveComponent, TranslateModule, MatIconModule],
  templateUrl: './pgp-key.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PgpKeyComponent {
  public pgpKey = signal<string | null>(null);

  public FILE_URL = environment.r2Url + environment.r2PgpKeyPath;

  public constructor(
    private readonly dataFetcherService: DataFetcherService,
    private readonly seoService: SeoService,
    private readonly translateService: TranslateService,
    private readonly alertService: AlertService,
  ) {
    this.seoService.setTags('PGP_KEY_PAGE.META.TITLE', 'PGP_KEY_PAGE.META.DESCRIPTION');
    void this.loadPgpKey();
  }

  public async loadPgpKey() {
    const pgpKey = await this.dataFetcherService.fetchPgpKey();

    this.pgpKey.set(pgpKey.trim());
  }

  public copyToClipboard() {
    if (!this.pgpKey()) {
      return;
    }

    void navigator.clipboard.writeText(this.pgpKey()!);

    this.alertService.showSuccess(this.translateService.instant('PGP_KEY_PAGE.ALERT.COPY_SUCCESS'));
  }
}
