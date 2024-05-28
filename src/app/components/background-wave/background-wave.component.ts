import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-background-wave',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './background-wave.component.html',
  styleUrls: ['./background-wave.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackgroundWaveComponent {}
