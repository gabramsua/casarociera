import { style, animate, trigger, transition } from '@angular/animations';

export const fadeIn = 
    trigger('fadeIn', [
        transition(':enter', [
          style({ height: 0, opacity: 0 }),
          animate('1s ease-out', style({ height: '*', opacity: 1 }))
        ]),
        transition(':leave', [
          style({ opacity: 1 }),
          animate('.5s ease-in', style({ height: '0px', opacity: 0 }))
        ]),
    ]);