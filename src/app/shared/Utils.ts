import Swal from "sweetalert2";
import { ImageViewerDialogData, ImageDialogComponent } from "./components/image-dialog/image-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { inject } from "@angular/core";

export default class Utils {
    static formatDate(date: Date): string {
        const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        };
        return new Intl.DateTimeFormat('es-ES', options).format(date);
    }
    
    static formatCurrency(amount: number): string {
        return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount);
    }

  static sweetAlert(){
    Swal.fire(
      '¡Guardado!',
      'Actualizando registros',
      'success'
    )
  }
  static errorAlert(error: string){
    Swal.fire(
      'Algo ha salido mal',
      'ERROR: '+error,
      'error'
    )
  }
    
  
  static openImageViewer(dialog: MatDialog,imageUrl: string | null | undefined, altText: string = 'Imagen del ticket'): void {
    // const dialog = inject(MatDialog);
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

    dialog.open(ImageDialogComponent, {
      data: dialogData,
      width: '80vw', // Opcional: Ancho del diálogo (80% del viewport width)
      maxWidth: '900px', // Opcional: Ancho máximo absoluto
      // Otras opciones:
      height: 'auto',
      // panelClass: 'custom-dialog-container', // Clase CSS personalizada para el panel del diálogo
      // disableClose: true, // Para evitar que se cierre al hacer clic fuera o con Esc
    });
  }
}