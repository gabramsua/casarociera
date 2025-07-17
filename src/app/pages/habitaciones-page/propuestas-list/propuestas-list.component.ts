import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VotoResumen } from 'src/app/models/models';
import { ApiService } from 'src/app/services/api.service';
import Constants from 'src/constants';

@Component({
  selector: 'app-propuestas-list',
  templateUrl: './propuestas-list.component.html',
  styleUrl: './propuestas-list.component.scss'
})
export class PropuestasListComponent {

  displayedColumns: string[] = ['id', 'aFavor', 'enContra', 'autor', 'acciones' ];
  dataSource: MatTableDataSource<VotoResumen>= new MatTableDataSource<VotoResumen>([]);
  selectedTabIndex = 2;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor( private api: ApiService) {}

  
  ngOnInit(): void {
    this.api.getAllByCasa(Constants.END_POINTS.VOTOS_PROPUESTAS_EVENTO_ACTIVO).subscribe((propuestas: VotoResumen[]) => {
      this.dataSource = new MatTableDataSource(propuestas);

      this.dataSource.data = propuestas.sort((a, b) => b.votosAFavor - a.votosAFavor);

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
}
