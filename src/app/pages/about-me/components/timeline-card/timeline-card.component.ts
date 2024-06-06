import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { expand } from '../../../../core/animations/expand';

@Component({
  selector: 'app-timeline-card',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatIconModule],
  animations: [expand],
  templateUrl: './timeline-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineCardComponent {
  @Input({
    required: true,
  })
  public year!: string;

  public readonly isOpen = signal(false);

  public toggle(): void {
    this.isOpen.update((isOpen) => !isOpen);
  }
}
