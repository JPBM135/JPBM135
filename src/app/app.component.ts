import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AlertComponent } from './components/alert/alert.component';
import { LayoutComponent } from './components/layout/layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent, TranslateModule, AlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public title = 'JPBM135';

  public constructor(
    private readonly matIconRegistry: MatIconRegistry,
    private readonly domSanitizer: DomSanitizer,
  ) {

    this.matIconRegistry.addSvgIcon(
      'no-courses',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/no-courses.svg'),
    );

    // this.matIconRegistry.setDefaultFontSetClass('material-symbols-outlined');
  }
}
