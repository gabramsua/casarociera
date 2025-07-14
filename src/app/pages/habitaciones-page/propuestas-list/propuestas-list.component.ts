import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Propuesta, VotoPropuestasEventoActivo } from 'src/app/models/models';
import { ApiService } from 'src/app/services/api.service';
import Constants from 'src/constants';

// Interfaz para el formato final de los datos de tu tabla
interface PropuestaAgregada {
  id: number; // ID de la propuesta
  aFavor: number;
  enContra: number;
  autor: string; // Nombre del autor de la propuesta
}

@Component({
  selector: 'app-propuestas-list',
  templateUrl: './propuestas-list.component.html',
  styleUrl: './propuestas-list.component.scss'
})
export class PropuestasListComponent {

  displayedColumns: string[] = ['id', 'aFavor', 'enContra', 'autor' ];
  dataSource: MatTableDataSource<PropuestaAgregada>= new MatTableDataSource<PropuestaAgregada>([]);;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor( private api: ApiService) {}

  
  ngOnInit(): void {
    this.api.getAll(Constants.END_POINTS.VOTOS_PROPUESTAS_EVENTO_ACTIVO).subscribe((propuestas) => {
      this.dataSource = new MatTableDataSource(propuestas);
      const aggregatedData = this.aggregateProposalVotes(propuestas);
      this.dataSource.data = aggregatedData;

       if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
      if (this.sort) {
        this.dataSource.sort = this.sort;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  private aggregateProposalVotes(votes: any[]): PropuestaAgregada[] {
    const aggregatedMap = new Map<number, { aFavor: number; enContra: number; autor: string }>();

    votes.forEach(vote => {
      const propuestaId = vote.propuesta.id;
      const autorNombre = vote.propuesta.participanteromeria.usuario.nombre;

      if (!aggregatedMap.has(propuestaId)) {
        aggregatedMap.set(propuestaId, {
          aFavor: 0,
          enContra: 0,
          autor: autorNombre
        });
      }

      const currentTotals = aggregatedMap.get(propuestaId)!; // El '!' asegura a TS que no será undefined

      if (vote.isAFavor === 1) {
        currentTotals.aFavor++;
      } else if (vote.isAFavor === 0) {
        currentTotals.enContra++;
      }
      // Puedes añadir un 'else' si isAFavor pudiera tener otros valores y quisieras manejarlos
    });

    // Convertir el Map a un array de objetos para MatTableDataSource
    const result: PropuestaAgregada[] = [];
    aggregatedMap.forEach((value, key) => {
      result.push({
        id: key,
        aFavor: value.aFavor,
        enContra: value.enContra,
        autor: value.autor
      });
    });

    return result;
  }
}
