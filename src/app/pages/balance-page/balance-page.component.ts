import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BalanceDeEventoCabecera, BalanceDeEventoResponse, TipoSelect } from 'src/app/models/models';
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
    dataSourceImmutable!: BalanceDeEventoResponse;
    balanceDeEventoCabecera!: BalanceDeEventoCabecera;
    flagFiltros = false;
    tiposmovimiento:TipoSelect[] = Constants.TIPOS_MOVIMIENTO;
    categorias: TipoSelect[] = [];
    selectedTipoMovimiento: number = 2; // Inicializa a 'Ver Todos'
    selectedCategoria: string = 'all';

    constructor( private router: Router, private api: ApiService, private dialog: MatDialog) {}
  
    ngOnInit(): void {
        this.api.getAllByCasa(Constants.END_POINTS.BALANCE_EVENTO).subscribe((response: BalanceDeEventoResponse) => {
            this.dataSource = { ...response, detalles: [...response.detalles] };;
            this.dataSourceImmutable = { ...response, detalles: [...response.detalles] };;
            this.balanceDeEventoCabecera = {
                casa: response.casa,
                year: response.year,
                totalGastos: response.totalGastos,
                totalIngresos: response.totalIngresos,
                balanceNeto: response.balanceNeto,
            }


            const nombresCategoriasUnicos = new Set<string>();
            response.detalles.forEach(x => {
                if (x.categoria && x.categoria.nombre) {
                nombresCategoriasUnicos.add(x.categoria.nombre);
                }
            });
            this.categorias = Array.from(nombresCategoriasUnicos).map(nombre => ({
                value: nombre, // El valor puede ser el mismo nombre o un ID si lo tienes
                viewValue: nombre
            }));
            this.categorias.unshift({ value: 'all', viewValue: 'Ver Todas' });

            this.aplicarFiltros(); 
  
        });
    }
  handleFiltros(){
    this.flagFiltros = !this.flagFiltros;
  }
  
    aplicarFiltros(): void {
    let filteredDetalles = [...this.dataSourceImmutable.detalles];

    // Filtro por Tipo de Movimiento
    if (this.selectedTipoMovimiento !== 2) { // Si no es 'Ver Todos'
        filteredDetalles = filteredDetalles.filter(x => Number(x.isIngreso) === this.selectedTipoMovimiento);
    }

    // Filtro por Categoría
    if (this.selectedCategoria !== 'all') { // Si no es 'Ver Todas las Categorías'
        filteredDetalles = filteredDetalles.filter(x => x.categoria && x.categoria.nombre === this.selectedCategoria);
    }

    this.dataSource.detalles = filteredDetalles;
    }
    
  async handleCreate(isIngreso = false) {}
    
}
