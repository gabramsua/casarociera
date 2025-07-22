import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Constants from 'src/constants';
import Utils from 'src/app/shared/Utils';
import { UltimosGastos } from 'src/app/models/models';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-gastos-horizontal-list',
    templateUrl: './gastos-horizontal-list.component.html',
    styleUrls: ['./gastos-horizontal-list.component.scss'],
    standalone: false
})
export class GastosHorizontalListComponent {
  gastos: UltimosGastos[] = [];
  dataReady = signal(false);


  constructor( private router: Router, private api: ApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.api.getAllByCasa(Constants.END_POINTS.ULTIMOS_10_GASTOS).subscribe((gastos) => {
      this.gastos = gastos;
      this.dataReady.set(true);
    });
  }

  formatDate(date: Date) {
    return Utils.formatDate(date);
  }

  openImageViewer(imageUrl: string | null | undefined, altText: string = 'Imagen del ticket'): void {
    // Puedes pasar el concepto real del detalle si quieres que aparezca en el diálogo
    Utils.openImageViewer(this.dialog, imageUrl, altText);
  }
}
