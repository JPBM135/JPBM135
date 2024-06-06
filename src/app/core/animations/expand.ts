import { trigger, state, style, transition, animate } from '@angular/animations';

export const expand = trigger('expand', [
  state('collapsed', style({ height: '0px', display: 'none' })),
  state('expanded', style({ height: '*' })),
  transition('expanded <=> collapsed', animate('0.2s ease-in-out')),
]);
