import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { VotoResumen } from 'src/app/models/models';
import { ApiService } from 'src/app/services/api.service';
import Constants from 'src/constants';


@Component({
    selector: 'app-propuestas-horizontal-list',
    templateUrl: './propuestas-horizontal-list.component.html',
    styleUrl: './propuestas-horizontal-list.component.scss',
    standalone: false
})
export class PropuestasHorizontalListComponent {
  resumenes: VotoResumen[] = [];
  dataReady = signal(false);

  constructor( private router: Router, private api: ApiService) {}

  ngOnInit(): void {
    this.api.getAllByCasa(Constants.END_POINTS.VOTOS_PROPUESTAS_EVENTO_ACTIVO).subscribe((propuestas: VotoResumen[]) => {
      this.dataReady.set(true);
      this.resumenes = propuestas.sort((a, b) => b.votosAFavor.length - a.votosAFavor.length);
    });
  }
}
