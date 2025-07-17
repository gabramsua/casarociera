import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ComidasEventoActivo } from 'src/app/models/models';
import { ApiService } from 'src/app/services/api.service';
import { ImageViewerDialogData, ImageDialogComponent } from 'src/app/shared/components/image-dialog/image-dialog.component';
import Utils from 'src/app/shared/Utils';
import Constants from 'src/constants';

@Component({
  selector: 'app-comidas-horizontal-list',
  templateUrl: './comidas-horizontal-list.component.html',
  styleUrl: './comidas-horizontal-list.component.scss'
})
export class ComidasHorizontalListComponent {
  comidas: ComidasEventoActivo[] = [];
  constructor( private router: Router, private api: ApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.api.getAllByCasa(Constants.END_POINTS.COMIDAS_EVENTO_ACTIVO).subscribe((comidas) => {
      this.comidas = comidas;
    });
  }

}
