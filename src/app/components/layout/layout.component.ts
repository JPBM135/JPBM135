import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { KonamiCodeService } from '../../core/services/konami-code/konami-code.service';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterModule, TranslateModule, FooterComponent],
  templateUrl: './layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  @Input() public showFooter = true;

  public currentYear = new Date().getFullYear();

  public constructor(public readonly konamiCodeService: KonamiCodeService) {
    konamiCodeService.initListeners();
  }
}
