import Swal from "sweetalert2";

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
    
}