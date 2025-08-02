import { Component } from '@angular/core';

@Component({
    selector: 'app-turnos-page',
    templateUrl: './turnos-page.component.html',
    styleUrls: ['./turnos-page.component.scss'],
    standalone: false
})
export class TurnosPageComponent {
    comidas= [
    {
        "id": 3,
        "horario": "15:30",
        "nombre": "Viernes Almuerzo",
        "platoPrincipal": "Arroz de carne",
        "year": {
            "id": 2,
            "year": 2025,
            "nombre": "octubre",
            "precio": 850.00,
            "casa": {
                "id": 2,
                "nombre": "Ánsares 3B"
            },
            "active": true
        }
    },
    {
        "id": 4,
        "horario": "22:15",
        "nombre": "Viernes Cena",
        "platoPrincipal": "Carrillá",
        "year": {
            "id": 2,
            "year": 2025,
            "nombre": "octubre",
            "precio": 850.00,
            "casa": {
                "id": 2,
                "nombre": "Ánsares 3B"
            },
            "active": true
        }
    }
]
}
