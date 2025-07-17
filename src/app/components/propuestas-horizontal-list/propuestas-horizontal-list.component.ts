import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PropuestasEventoActivo, VotoPropuestasEventoActivo } from 'src/app/models/models';
import { ApiService } from 'src/app/services/api.service';
import Constants from 'src/constants';

interface VotoResumen {
  propuestaId: number;
  autor: string;
  fecha: Date;
  aFavor: number;
  enContra: number;
}

@Component({
  selector: 'app-propuestas-horizontal-list',
  templateUrl: './propuestas-horizontal-list.component.html',
  styleUrl: './propuestas-horizontal-list.component.scss'
})
export class PropuestasHorizontalListComponent {
  votopropuestas: VotoPropuestasEventoActivo[] = [];
  propuesta!: PropuestasEventoActivo;

  resumenes: VotoResumen[] = [];

  constructor( private router: Router, private api: ApiService) {}

  ngOnInit(): void {
    this.api.getAllByCasa(Constants.END_POINTS.VOTOS_PROPUESTAS_EVENTO_ACTIVO).subscribe((propuestas) => {
      this.votopropuestas = propuestas;
      this.propuesta = this.votopropuestas[0].propuesta;      
      this.resumenes = this.getResumenPorPropuesta(this.votopropuestas);
    });
  }

  getResumenPorPropuesta(votos: VotoPropuestasEventoActivo[]): VotoResumen[] {
    const mapa = new Map<number, VotoResumen>();

    for (const voto of votos) {
      const prop = voto.propuesta;
      const id = prop.id;

      if (!mapa.has(id)) {
        mapa.set(id, {
          propuestaId: id,
          autor: prop.participanteromeria.usuario.nombre,
          fecha: prop.fecha,
          aFavor: 0,
          enContra: 0,
        });
      }

      const resumen = mapa.get(id)!;
      voto.isAFavor ? resumen.aFavor++ : resumen.enContra++;
    }

    return Array.from(mapa.values()).sort((a, b) => b.aFavor - a.aFavor);
  }
}
