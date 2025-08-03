import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { ApiService } from 'src/app/services/api.service';
import Constants from 'src/constants';

@Component({
  selector: 'app-listacompra',
  standalone: false,
  templateUrl: './listacompra.component.html',
  styleUrl: './listacompra.component.scss'
})
export class ListacompraComponent  implements OnInit {

  // Propiedades para gestionar el estado de la aplicación
  listasCompra: any[] = [];
  listaSeleccionada: any = null;
  items: any[] = [];
  
  // Propiedades para los formularios
  nuevaListaNombre: string = '';
  nuevoItemNombre: string = '';
  nuevoItemCantidad: number = 1;

  // ID de la casa, asumimos que viene de la configuración de entorno
  private casaId: number = environment.casa;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Cuando el componente se inicialice, carga todas las listas de la compra
    this.cargarListasCompra();
  }

  // Métodos para las listas de la compra
  
  cargarListasCompra(): void {
    this.apiService.getAllByCasa(Constants.END_POINTS.LISTAS_COMPRA_DE_CASA).subscribe(
      (listas: any[]) => {
        this.listasCompra = listas;
        console.log('Listas de la compra cargadas:', this.listasCompra);
      },
      error => {
        console.error('Error al cargar las listas de la compra:', error);
      }
    );
  }

  crearNuevaLista(): void {
    if (this.nuevaListaNombre.trim()) {
      const nuevaLista = {
        nombre: this.nuevaListaNombre,
        estado: 'ACTIVA',
        casa: { id: this.casaId }
      };
      this.apiService.post('listascompra', nuevaLista).subscribe(
        (listaCreada) => {
          console.log('Lista creada:', listaCreada);
          this.cargarListasCompra(); // Recarga las listas para mostrar la nueva
          this.nuevaListaNombre = ''; // Limpia el input
        },
        error => {
          console.error('Error al crear la lista:', error);
        }
      );
    }
  }

  eliminarLista(id: number): void {
    this.apiService.delete('listascompra', id).subscribe(
      () => {
        console.log('Lista eliminada con éxito.');
        this.cargarListasCompra(); // Recarga las listas
        if (this.listaSeleccionada && this.listaSeleccionada.id === id) {
          this.deseleccionarLista();
        }
      },
      error => {
        console.error('Error al eliminar la lista:', error);
      }
    );
  }

  // Métodos para los ítems de la lista
  
  seleccionarLista(lista: any): void {
    this.listaSeleccionada = lista;
    this.cargarItemsLista(lista.id);
  }

  deseleccionarLista(): void {
    this.listaSeleccionada = null;
    this.items = []; // Limpia los ítems al deseleccionar
  }

  cargarItemsLista(listaId: number): void {
    // ASUMIMOS un endpoint como '/api/listascompra/{listaId}/items'
    // Este endpoint debe ser creado en el backend.
    this.apiService.getAll('listascompra/' + listaId + '/items').subscribe(
      (items: any[]) => {
        this.items = items;
        console.log('Ítems cargados para la lista:', this.items);
      },
      error => {
        console.error('Error al cargar los ítems:', error);
      }
    );
  }

  crearItem(): void {
    if (this.nuevoItemNombre.trim() && this.listaSeleccionada) {
      const nuevoItem = {
        nombre: this.nuevoItemNombre,
        cantidad: this.nuevoItemCantidad,
        comprado: false,
        listaCompra: { id: this.listaSeleccionada.id }
      };
      // ASUMIMOS un endpoint como 'api/listascompra/{listaId}/items'
      this.apiService.post('listascompra/' + this.listaSeleccionada.id + '/items', nuevoItem).subscribe(
        (itemCreado) => {
          console.log('Ítem creado:', itemCreado);
          this.cargarItemsLista(this.listaSeleccionada.id); // Recarga los ítems
          this.nuevoItemNombre = '';
          this.nuevoItemCantidad = 1;
        },
        error => {
          console.error('Error al crear el ítem:', error);
        }
      );
    }
  }

  actualizarItem(item: any): void {
    // ASUMIMOS un endpoint como 'api/itemlista/{itemId}'
    this.apiService.put('itemlista', item).subscribe(
      (itemActualizado) => {
        console.log('Ítem actualizado:', itemActualizado);
      },
      error => {
        console.error('Error al actualizar el ítem:', error);
      }
    );
  }

  eliminarItem(id: number): void {
    // ASUMIMOS un endpoint como 'api/itemlista/{itemId}'
    this.apiService.delete('itemlista', id).subscribe(
      () => {
        console.log('Ítem eliminado con éxito.');
        this.cargarItemsLista(this.listaSeleccionada.id); // Recarga los ítems
      },
      error => {
        console.error('Error al eliminar el ítem:', error);
      }
    );
  }
}