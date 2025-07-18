import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Constants from 'src/constants';
import Utils from 'src/app/shared/Utils';
import { UltimosGastos } from 'src/app/models/models';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent, ImageViewerDialogData } from 'src/app/shared/components/image-dialog/image-dialog.component';

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
    if (!imageUrl) {
      console.warn('URL de imagen no proporcionada.');
      // Opcional: mostrar un SweetAlert2 o un toast indicando que no hay imagen
      Utils.errorAlert('No se ha proporcionado una URL de imagen válida.');

      return; 
    }

    const dialogData: ImageViewerDialogData = {
      imageUrl: imageUrl,
      altText: altText,
      concepto: altText
    };

    this.dialog.open(ImageDialogComponent, {
      data: dialogData,
      width: '80vw', // Opcional: Ancho del diálogo (80% del viewport width)
      maxWidth: '900px', // Opcional: Ancho máximo absoluto
      // Otras opciones:
      // height: 'auto',
      // panelClass: 'custom-dialog-container', // Clase CSS personalizada para el panel del diálogo
      // disableClose: true, // Para evitar que se cierre al hacer clic fuera o con Esc
    });
  }
}
