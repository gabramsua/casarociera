import { Component } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Habitacion } from 'src/app/models/models';
import { ApiService } from 'src/app/services/api.service';
import Constants from 'src/constants';
import { expandAnimation } from 'src/app/shared/animations/expandAnimation';

@Component({
    selector: 'app-habitaciones-list',
    templateUrl: './habitaciones-list.component.html',
    styleUrl: './habitaciones-list.component.scss',
    animations: [
        expandAnimation
    ],
    standalone: false
})
export class HabitacionesListComponent {
  // gastos: UltimosGastos[] = [];

  dataSource: Habitacion[] = [];
  columnsToDisplay = ['nombre', 'capacidad'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: Habitacion | null;


  constructor( private router: Router, private api: ApiService, private dialog: MatDialog) {}
  // El dialog para cuando el admin pueda editar las habitaciones

  ngOnInit(): void {
    this.api.getAllByCasa(Constants.COLLECTION.HABITACION+'s').subscribe((habitaciones) => {
      this.dataSource = habitaciones;
    });
  }

  /** Checks whether an element is expanded. */
  isExpanded(element: Habitacion) {
    return this.expandedElement === element;
  }

  /** Toggles the expanded state of an element. */
  toggle(element: Habitacion) {
    this.expandedElement = this.isExpanded(element) ? null : element;
  }

  isCapacidad(column: string): boolean {
    return column === 'capacidad';
  }
  getCapacidadTotal(): number {
    return this.dataSource.map(t => t.capacidad).reduce((acc, value) => acc + value, 0);
  }
}
