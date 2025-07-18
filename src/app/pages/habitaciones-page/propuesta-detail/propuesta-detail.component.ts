import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetalleCompletoPropuestaAsignacion, Habitacion, Usuario, VotarRequest } from 'src/app/models/models';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import Constants from 'src/constants';

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

  currentUser: Usuario | null = this.authService.getUsuario();
  usuarioVoto: 'favor' | 'contra' | null = null;

  readonly panelOpenState = signal(false);

  constructor(private route: ActivatedRoute, private api: ApiService, private authService: AuthService) {}

  ngOnInit(): void {
    this.autor = this.route.snapshot.queryParamMap.get('autor') || '';
    const tab = this.route.snapshot.queryParamMap.get('tab');
    this.tabIndex = tab ? parseInt(tab, 10) : 0;
  
    this.propuestaId = this.route.snapshot.paramMap.get('id') ? parseInt(this.route.snapshot.paramMap.get('id')!, 10) : 0;
    this.api.getDetallePropuesta(this.propuestaId).subscribe((data: DetalleCompletoPropuestaAsignacion) => {
      this.votosAFavor = data.votosAFavor;
      this.votosEnContra = data.votosEnContra;
      this.asignaciones = data.asignaciones.sort((a, b) => a.habitacion.id - b.habitacion.id);
      
      if (this.votosAFavor.includes(this.currentUser?.nombre || '')) {
        this.usuarioVoto = 'favor';
      } else if (this.votosEnContra.includes(this.currentUser?.nombre || '')) {
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
    const nuevoVoto  = aFavor ? 'favor' : 'contra';
    
    // Si ya ha votado lo mismo, no hacer nada
    if (this.usuarioVoto === nuevoVoto) return;
    
    this.usuarioVoto = nuevoVoto;
    const voto: VotarRequest = {
      idPropuesta: this.propuestaId,
      idParticipanteromeria: this.currentUser?.id || 0,
      isAFavor: aFavor
    };

    this.api.post(Constants.END_POINTS.VOTAR, voto).subscribe(() => {
      if (aFavor) {
        this.votosAFavor.push(this.currentUser?.nombre || '');
        this.votosEnContra = this.votosEnContra.filter(v => v !== this.currentUser?.nombre);
      } else {
        this.votosEnContra.push(this.currentUser?.nombre || '');
        this.votosAFavor = this.votosAFavor.filter(v => v !== this.currentUser?.nombre);
      }
      // this.tabIndex = 0; // Reset to first tab after voting
    });
  }
}
