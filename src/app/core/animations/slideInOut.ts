import { animate, state, style, transition, trigger } from '@angular/animations';

export const slideInOutAnimation = trigger('slideInOutAnimation', [
  state(
    'enter',
    style({
      left: '-100%',
      opacity: 0,
    }),
  ),
  state(
    'stable',
    style({
      left: '0%',
      opacity: 1,
    }),
  ),
  state(
    'leave',
    style({
      left: '-100%',
      opacity: 0,
    }),
  ),
  transition('enter => stable', [animate('0.5s ease-in-out')]),
  transition('stable => leave', [animate('0.5s ease-in-out')]),
  transition('leave => enter', [animate('0.5s ease-in-out')]),
]);
