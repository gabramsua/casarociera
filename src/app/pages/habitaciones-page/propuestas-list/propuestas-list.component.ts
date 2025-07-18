import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario, VotoResumen } from 'src/app/models/models';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
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
  currentUser: Usuario | null = this.authService.getUsuario();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor( private api: ApiService, private authService: AuthService) {}

  
  ngOnInit(): void {
    this.api.getAllByCasa(Constants.END_POINTS.VOTOS_PROPUESTAS_EVENTO_ACTIVO).subscribe((propuestas: VotoResumen[]) => {
      this.dataSource = new MatTableDataSource(propuestas);

      this.dataSource.data = propuestas.sort((a, b) => b.votosAFavor.length - a.votosAFavor.length);

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
  numBotones(row: any): number {
    let count = 1; // Siempre tiene el botón de "visibility"
    if (!this.userHaVotado(row)) count++;
    if (this.userIsOwner(row)) count++;
    return count;
  }
  getMaxNumBotones(): number {
    return this.dataSource.data.reduce((max, row) => {
      const botones = this.numBotones(row);
      return botones > max ? botones : max;
    }, 0);
  }


  userHaVotado(row: VotoResumen): boolean {
    return  this.currentUser && this.currentUser.nombre
        ? row.votosAFavor.includes(this.currentUser.nombre) || row.votosEnContra.includes(this.currentUser.nombre)
        : false;

  }
  userIsOwner(row: any): boolean {
    return  this.currentUser && this.currentUser.nombre
        ? row.autor === this.currentUser.nombre
        : false;
  }


  
}
