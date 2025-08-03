import { Component } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { ComidasEventoActivo } from 'src/app/models/models';
import { ApiService } from 'src/app/services/api.service';
import Constants from 'src/constants';

@Component({
    selector: 'app-turnos-page',
    templateUrl: './turnos-page.component.html',
    styleUrls: ['./turnos-page.component.scss'],
    standalone: false
})
export class TurnosPageComponent {
  comidas: ComidasEventoActivo[] = [];
  turnosComida: any[] = [];
  environment = environment;
  
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    if(!environment.info.modulo_turnos_comida) {
        this.api.getAllByCasa(Constants.END_POINTS.COMIDAS_EVENTO_ACTIVO).subscribe((comidas) => {
        this.comidas = comidas;
        });
    } else {
        this.api.getAllByCasa(Constants.END_POINTS.PARTICIPANTES_COMIDAS_EVENTO_ACTIVO).subscribe((turnosComida) => {
            this.turnosComida = turnosComida;
        });
    }
  }
}
