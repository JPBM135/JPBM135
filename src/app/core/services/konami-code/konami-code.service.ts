import { DestroyRef, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { fromEvent } from 'rxjs';
import { KonamiCodeComponent } from '../../../components/konami-code/konami-code.component';

@Injectable({
  providedIn: 'root',
})
export class KonamiCodeService {
  public static readonly KONAMI_CODE = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a',
  ];

  public static readonly KONAMI_CODE_STRING = KonamiCodeService.KONAMI_CODE.join('');

  public lastPressedKeys: string[] = [];

  public constructor(
    private readonly destroyRef: DestroyRef,
    private readonly matDialog: MatDialog,
  ) {}

  public initListeners(): void {
    console.log('initListeners');
    fromEvent(document, 'keydown')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event: Event) => {
        if (!(event instanceof KeyboardEvent)) {
          return;
        }

        const sliceIndex = -KonamiCodeService.KONAMI_CODE.length;

        this.lastPressedKeys.push(event.key);
        this.lastPressedKeys = this.lastPressedKeys.slice(sliceIndex);

        if (this.lastPressedKeys.join('') === KonamiCodeService.KONAMI_CODE_STRING) {
          this.activateKonamiCode();
        }
      });
  }

  public activateKonamiCode(): void {
    this.matDialog.open(KonamiCodeComponent, {
      panelClass: ['mat-dialog-transparent'],
    });
  }
}
