import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  signal,
  type AfterViewInit,
} from '@angular/core';
import { getHexColorFormStringHash } from '../../core/utils/generateColorFromStringHash';

@Component({
  selector: 'app-skill-tag',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skill-tag.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillTagComponent implements AfterViewInit {
  @Input() public skill: string = '';

  public color = signal('red');

  public backgroundColor = signal('red');

  public ngAfterViewInit(): void {
    this.color.set(getHexColorFormStringHash(this.skill, 'FF', 75));
    this.backgroundColor.set(getHexColorFormStringHash(this.skill, '2F'));
  }
}
