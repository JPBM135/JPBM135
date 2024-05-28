import { trigger, style, transition, animate } from '@angular/animations';

export const heightGrow = trigger('heightGrow', [
  transition(':enter', [
    style({ height: '0' }),
    animate('0.2s ease-in-out', style({ height: '*' })),
  ]),
]);
