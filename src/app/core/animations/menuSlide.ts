import { trigger, style, transition, animate } from '@angular/animations';

export const menuSlide = trigger('menuSlide', [
  transition(':enter', [
    style({ transform: 'translateX(100%)' }),
    animate('0.3s ease-in-out', style({ transform: 'translateX(0%)' })),
  ]),
  transition(':leave', [
    style({ transform: 'translateX(0%)' }),
    animate('0.3s ease-in-out', style({ transform: 'translateX(100%)' })),
  ]),
]);
