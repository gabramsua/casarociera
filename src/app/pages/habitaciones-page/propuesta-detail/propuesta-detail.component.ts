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
  autor: string = '';
  propuestaId: number = 0;
  tabIndex: number = 0;
  votosAFavor: string[] = [];
  votosEnContra: string[] = [];
  asignaciones: Asignacion [] = [];

  
  usuarioNombre = localStorage.getItem('usuario') || '';
  usuarioVoto: 'favor' | 'contra' | null = null;

  readonly panelOpenState = signal(false);

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit(): void {
    this.autor = this.route.snapshot.queryParamMap.get('autor') || '';
    const tab = this.route.snapshot.queryParamMap.get('tab');
    this.tabIndex = tab ? parseInt(tab, 10) : 0;
  
    this.propuestaId = this.route.snapshot.paramMap.get('id') ? parseInt(this.route.snapshot.paramMap.get('id')!, 10) : 0;
    this.api.getDetallePropuesta(this.propuestaId).subscribe(data => {
      this.votosAFavor = data.votosAFavor;
      this.votosEnContra = data.votosEnContra;
      this.asignaciones = data.asignaciones;

      
      if (this.votosAFavor.includes(this.usuarioNombre)) {
        this.usuarioVoto = 'favor';
      } else if (this.votosEnContra.includes(this.usuarioNombre)) {
        this.usuarioVoto = 'contra';
      } else {
        this.usuarioVoto = null;
      }
    });
  }

  getPersonasByHabitacion(habitacionName: string): string[] {
    const habitacion = this.asignaciones.find(h => h.habitacion.nombre === habitacionName);
    return habitacion?.personas ?? [];
  }

  votar(aFavor: boolean): void {
    this.usuarioVoto = aFavor ? 'favor' : 'contra';

    // Aquí harías la llamada al backend para registrar el voto
    // this.api.votarPropuesta(this.propuestaId, this.usuarioNombre, aFavor).subscribe(() => {
    //   // podrías recargar los votos o actualizar localmente el estado si lo prefieres
    // });
  }
}
