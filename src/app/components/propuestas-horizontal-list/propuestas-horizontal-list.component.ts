import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ComidasEventoActivo } from 'src/app/models/models';
import { ApiService } from 'src/app/services/api.service';
import Constants from 'src/constants';

@Component({
  selector: 'app-propuestas-horizontal-list',
  templateUrl: './propuestas-horizontal-list.component.html',
  styleUrl: '../gastos-horizontal-list/gastos-horizontal-list.component.scss'
})
export class PropuestasHorizontalListComponent {
  comidas: ComidasEventoActivo[] = [];
  constructor( private router: Router, private api: ApiService) {}

  ngOnInit(): void {
    this.api.getAll(Constants.END_POINTS.COMIDAS_EVENTO_ACTIVO).subscribe((comidas) => {
      this.comidas = comidas;
    });
  }

}
