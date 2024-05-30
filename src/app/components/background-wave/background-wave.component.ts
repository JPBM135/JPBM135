import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DarkModeService } from '../../core/services/dark-mode/dark-mode.service';

@Component({
  selector: 'app-background-wave',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './background-wave.component.html',
  styleUrls: ['./background-wave.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackgroundWaveComponent {
  public constructor(public readonly darkModeService: DarkModeService) {}
}
