import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import Constants from 'src/constants';
import { Asignacion, Habitacion, UsuarioLanding } from 'src/app/models/models';
import { forkJoin } from 'rxjs'; // Importa forkJoin


@Component({
    selector: 'app-propuestas-create',
    templateUrl: './propuestas-create.component.html',
    styleUrl: './propuestas-create.component.scss',
    standalone: false,
})
export class PropuestasCreateComponent {
  tabIndex: number = 0;
//   usuarios: UsuarioLanding[] = [];
//   habitaciones: Habitacion[] = [];
//   asignaciones: Asignacion [] = [];


  // Lista maestra de todos los usuarios (UsuarioLanding), para buscar sus nombres
  todosLosUsuariosLanding: UsuarioLanding[] = [];
  // Los NOMBRES de los usuarios que NO están asignados a ninguna habitación
  personasDisponibles: string[] = []; // Array de strings (nombres de personas)
  // Todas las habitaciones disponibles
  todasLasHabitaciones: Habitacion[] = [];
  // Mapa para gestionar las asignaciones actuales: Habitacion ID -> Asignacion
  // asignacionesMap: Map<number, Asignacion> = new Map();
  todasLasAsignaciones: Asignacion[] = [];


  constructor(private route: ActivatedRoute, private api: ApiService) {}
  // 1. Traer todos los participantes de la romería de esta casa
  // 2. Traer todas las habitaciones de esta casa

  ngOnInit(): void {
    const tab = this.route.snapshot.queryParamMap.get('tab');
    this.tabIndex = tab ? parseInt(tab, 10) : 0;

    this.cargarDatosIniciales();
    }
    
    cargarDatosIniciales() {
        // 1. Define tus Observables para cada llamada a la API
        const getParticipantes$ = this.api.getAllByCasa(Constants.END_POINTS.GET_ALL_PARTICIPANTES_ACTIVOS);
        const getHabitaciones$ = this.api.getAllByCasa(Constants.COLLECTION.HABITACION + 's');

        // 2. Usa forkJoin para esperar a que ambos completen
        forkJoin({
          participantes: getParticipantes$, // El resultado de esta API estará en data.participantes
          habitaciones: getHabitaciones$    // El resultado de esta API estará en data.habitaciones
        }).subscribe((data: { participantes: UsuarioLanding[], habitaciones: Habitacion[] }) => {

            // 3. Cuando ambas llamadas han completado, inicializa tus propiedades
            // this.todosLosUsuariosLanding = data.participantes;
            // this.todasLasHabitaciones = data.habitaciones;
            this.todosLosUsuariosLanding = Array.from({ length: 10 })
              .flatMap((_, i) => data.participantes.map(p => ({
                ...p,
                id: p.id * 1000 + i + 1, // Genera un ID 'único' para la copia
                usuario: { ...p.usuario, nombre: `${p.usuario.nombre} copy ${i + 1}` }
              })));
          this.todasLasHabitaciones = Array.from({ length: 5 })
            .flatMap((_, i) => data.habitaciones.map(h => ({
              ...h,
              id: h.id * 100 + i + 1, // Genera un ID 'único' para la copia de la habitación
              nombre: `${h.nombre} ${i + 1}` // Añade un sufijo al nombre
            })));

            // 4. Ahora que 'this.todosLosUsuariosLanding' está lleno, puedes usarlo
            this.personasDisponibles = this.todosLosUsuariosLanding.map(u => u.usuario.nombre);

            this.todasLasHabitaciones.forEach(habitacion => {
              this.todasLasAsignaciones.push({
                habitacion: habitacion,
                personas: [] // Array de nombres vacío inicialmente
              });
            });
        });
    }

  // --- Lógica de Drag & Drop ---

  // El tipo de los datos arrastrados ahora es 'string[]' (nombres de usuario)
  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      // Reordenar dentro de la misma lista
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Transferir entre listas (personasDisponibles <-> asignacion.personas)
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      // Después de cada drop, actualizamos la lista de personas disponibles
      this.actualizarPoolDeDisponibles();
    }
  }

  // Genera la lista de IDs de todas las listas de cdkDropList para conectarlas
  getAllConnectedListIds(): string[] {
    const listIds: string[] = ['personas-disponibles-list']; // ID de la lista de usuarios disponibles
    this.todasLasHabitaciones.forEach(hab => {
      listIds.push(`habitacion-${hab.id}-list`); // IDs de las listas de cada habitación
    });
    return listIds;
  }


  predicate = (drag: CdkDrag<string>, drop: CdkDropList<string[]>) => {
    // Si el destino es la lista de personas disponibles, siempre es válido.
    if (drop.id === 'personas-disponibles-list') {
      return true;
    }

    // Si el destino es una habitación:
    const habitacionId = this.extractHabitacionIdFromListId(drop.id);
    const asignacion = this.getAsignacionForHabitacion(habitacionId); // Usar getAsignacionForHabitacion 
    if (asignacion) {
      const currentOccupancy = asignacion.personas.length;
      const capacity = asignacion.habitacion.capacidad;

      // Permitir el drop solo si la habitación no ha alcanzado su capacidad máxima
      return currentOccupancy < capacity;
    }
    return false; // Si no se encuentra la asignación (lo cual ahora debería ser raro), no permitir el drop
  };

  // NECESITAS ESTA FUNCIÓN para que el predicado funcione
  private extractHabitacionIdFromListId(listId: string): number {
    const parts = listId.split('-');
    // Asegúrate de que el ID esté en la posición correcta.
    // Si el ID es `habitacion-ID-list`, entonces `parts[1]` es el ID.
    // Si el formato es diferente, ajústalo.
    if (parts.length >= 2 && parts[0] === 'habitacion' && parts[2] === 'list') {
      return parseInt(parts[1], 10);
    }
    // Manejo de error o valor por defecto si el formato no es el esperado
    console.error(`Unexpected list ID format: ${listId}`);
    return -1; // O lanza un error, dependiendo de tu manejo
  }

  // --- Helpers para obtener datos en la plantilla ---

 // Método para obtener la Asignacion para una habitación específica de nuestro array `todasLasAsignaciones`
  getAsignacionForHabitacion(habitacionId: number): Asignacion | undefined {
    // Busca en el array `todasLasAsignaciones` la asignación cuya `habitacion.id` coincida.
    return this.todasLasAsignaciones.find(asignacion => asignacion.habitacion.id === habitacionId);
  }

  // Este método recalcula qué nombres de usuarios están en el pool de "disponibles"

  actualizarPoolDeDisponibles(): void {
    const assignedPeopleNames = new Set<string>();

    // ITERA SOBRE TODAS LAS ASIGNACIONES PARA RECOPILAR LOS NOMBRES ASIGNADOS
    this.todasLasAsignaciones.forEach(asignacion => {
      asignacion.personas.forEach(personaNombre => assignedPeopleNames.add(personaNombre));
    });

    // Filtra todos los nombres de usuarios originales para mantener solo aquellos que NO están asignados
    this.personasDisponibles = this.todosLosUsuariosLanding
      .map(u => u.usuario.nombre) // Mapea a solo los nombres de todos los usuarios posibles
      .filter(nombre => !assignedPeopleNames.has(nombre)); // Filtra los que YA ESTÁN en el Set de asignados
  }

  
}
