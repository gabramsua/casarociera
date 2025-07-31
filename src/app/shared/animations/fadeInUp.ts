import { trigger, transition, style, animate } from '@angular/animations';

export const fadeInUp =
    trigger('fadeInUp', [
        transition(':enter', [
            style({
                opacity: 0,
                transform: 'translateY(200px)' // Empieza 20px más abajo
            }),
            animate('1.5s ease-out', style({
                opacity: 1,
                transform: 'translateY(0)' // Termina en su posición original
            }))
        ]),
        // Puedes agregar una transición ':leave' si quieres un efecto de salida
        // Por ejemplo, que se desvanezca y se deslice hacia abajo al salir:
        transition(':leave', [
            style({
                opacity: 1,
                transform: 'translateY(0)'
            }),
            animate('1.5s ease-in', style({
                opacity: 0,
                transform: 'translateY(200px)' // Se desliza hacia abajo al salir
            }))
        ])
    ]);