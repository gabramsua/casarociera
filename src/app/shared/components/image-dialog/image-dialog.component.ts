import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface ImageViewerDialogData {
  imageUrl: string;
  altText?: string; // Texto alternativo para la imagen (accesibilidad)
  concepto?: string; // Concepto del gasto, opcional
}

@Component({
    selector: 'app-image-dialog',
    templateUrl: './image-dialog.component.html',
    styleUrl: './image-dialog.component.scss',
    standalone: false
})
export class ImageDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ImageViewerDialogData) {}
}
