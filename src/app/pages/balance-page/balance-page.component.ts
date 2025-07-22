import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BalanceDeEventoCabecera, BalanceDeEventoResponse } from 'src/app/models/models';
import { ApiService } from 'src/app/services/api.service';
import { fadeIn } from 'src/app/shared/animations/fade';
import Constants from 'src/constants';

@Component({
    selector: 'app-balance-page',
    templateUrl: './balance-page.component.html',
    styleUrls: ['./balance-page.component.scss'],
    standalone: false,
  animations: [fadeIn]
})
export class BalancePageComponent {
    dataSource!: BalanceDeEventoResponse;
    balanceDeEventoCabecera!: BalanceDeEventoCabecera;
  flagFiltros = false;

    constructor( private router: Router, private api: ApiService, private dialog: MatDialog) {}
  
    ngOnInit(): void {
        this.api.getAllByCasa(Constants.END_POINTS.BALANCE_EVENTO).subscribe((response: BalanceDeEventoResponse) => {
            this.dataSource = response;
            this.balanceDeEventoCabecera = {
                casa: response.casa,
                year: response.year,
                totalGastos: response.totalGastos,
                totalIngresos: response.totalIngresos,
                balanceNeto: response.balanceNeto,
            }
        });
    }
  handleFiltros(){
    this.flagFiltros = !this.flagFiltros;
  }
    
  async handleCreate(isIngreso = false) {}
    
}
