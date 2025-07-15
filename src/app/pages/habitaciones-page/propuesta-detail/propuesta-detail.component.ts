import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Habitacion } from 'src/app/models/models';
import { ApiService } from 'src/app/services/api.service';

interface Asignacion {
  habitacion: Habitacion, 
  personas: string[]
}

@Component({
  selector: 'app-propuesta-detail',
  templateUrl: './propuesta-detail.component.html',
  styleUrl: './propuesta-detail.component.scss'
})
export class PropuestaDetailComponent {
  propuestaId: number = 0;
  tabIndex: number = 0;
  votosAFavor: string[] = [];
  votosEnContra: string[] = [];
  asignaciones: Asignacion [] = [];

  readonly panelOpenState = signal(false);

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit(): void {
    const tab = this.route.snapshot.queryParamMap.get('tab');
    this.tabIndex = tab ? parseInt(tab, 10) : 0;
  
    this.propuestaId = this.route.snapshot.paramMap.get('id') ? parseInt(this.route.snapshot.paramMap.get('id')!, 10) : 0;
    this.api.getDetallePropuesta(this.propuestaId).subscribe(data => {
      this.votosAFavor = data.votosAFavor;
      this.votosEnContra = data.votosEnContra;
      this.asignaciones = data.asignaciones;

    });
  }

  getPersonasByHabitacion(habitacionName: string): string[] {
    const habitacion = this.asignaciones.find(h => h.habitacion.nombre === habitacionName);
    return habitacion?.personas ?? [];
  }

}
