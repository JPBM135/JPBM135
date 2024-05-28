import { Directive, ElementRef, Input, type OnInit } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Directive({
  selector: '[tooltipWhenTruncated]',
  standalone: true,
})
export class TooltipWhenTruncatedDirective implements OnInit {
  @Input('tooltipWhenTruncated') public tooltipText: string = '';

  public constructor(
    private readonly elementRef: ElementRef,
    private readonly matTooltip: MatTooltip,
  ) {}

  public ngOnInit() {
    this.checkIfTextIsTruncated();
    this.elementRef.nativeElement.addEventListener('mouseenter', () => {
      this.checkIfTextIsTruncated();
    });
  }

  private checkIfTextIsTruncated() {
    setTimeout(() => {
      const element = this.elementRef.nativeElement;
      if (element.scrollWidth > element.clientWidth) {
        this.matTooltip.message = this.tooltipText || element.textContent;
      } else {
        this.matTooltip.hide();
      }
    });
  }
}
