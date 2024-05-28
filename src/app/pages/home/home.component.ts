import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { BackgroundWaveComponent } from '../../components/background-wave/background-wave.component';
import { LayoutComponent } from '../../components/layout/layout.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, LayoutComponent, BackgroundWaveComponent, TranslateModule, MatIconModule],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  @ViewChild('courses') public coursesDiv!: ElementRef<HTMLDivElement>;

  public constructor() {}

  public scrollToCourses(): void {
    if (!this.coursesDiv?.nativeElement) {
      return;
    }

    this.coursesDiv.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
