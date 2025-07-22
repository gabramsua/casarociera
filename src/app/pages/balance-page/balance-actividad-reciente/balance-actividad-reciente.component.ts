import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BalanceDeEventoResponse } from 'src/app/models/models';
import Utils from 'src/app/shared/Utils';

@Component({
  selector: 'app-balance-actividad-reciente',
  standalone: false,
  templateUrl: './balance-actividad-reciente.component.html',
  styleUrl: './balance-actividad-reciente.component.scss'
})
export class BalanceActividadRecienteComponent {
  @Input() balanceDeEvento!: BalanceDeEventoResponse;
  
  constructor(private dialog: MatDialog) {}
  
  openImageViewer(imageUrl: string | null | undefined, altText: string = 'Imagen del ticket'): void {
    // Puedes pasar el concepto real del detalle si quieres que aparezca en el diálogo
    Utils.openImageViewer(this.dialog, imageUrl, altText);
  }

}
