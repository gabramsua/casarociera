import { Component, OnInit } from '@angular/core'; // Añadido OnInit
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import Constants from 'src/constants';
import { Asignacion, Habitacion, UsuarioLanding } from 'src/app/models/models';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-propuestas-create',
  templateUrl: './propuestas-create.component.html',
  styleUrl: './propuestas-create.component.scss',
  standalone: false,
})
export class PropuestasCreateComponent implements OnInit { // Implementa OnInit
  tabIndex: number = 0; // Propiedad usada para ActivatedRoute

  todosLosUsuariosLanding: UsuarioLanding[] = [];
  // Los NOMBRES de los usuarios que NO están asignados a ninguna habitación
  personasDisponibles: string[] = [];
  todasLasHabitaciones: Habitacion[] = [];
  todasLasAsignaciones: Asignacion[] = [];

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit(): void {
    const tab = this.route.snapshot.queryParamMap.get('tab');
    this.tabIndex = tab ? parseInt(tab, 10) : 0;
    this.cargarDatosIniciales();
  }

  cargarDatosIniciales(): void {
    const getParticipantes$ = this.api.getAllByCasa(Constants.END_POINTS.GET_ALL_PARTICIPANTES_ACTIVOS);
    const getHabitaciones$ = this.api.getAllByCasa(Constants.COLLECTION.HABITACION + 's');

    forkJoin({
      participantes: getParticipantes$,
      habitaciones: getHabitaciones$
    }).subscribe({
      next: (data: { participantes: UsuarioLanding[], habitaciones: Habitacion[] }) => {
        this.todosLosUsuariosLanding = data.participantes;
        this.todasLasHabitaciones = data.habitaciones;

        this.todasLasHabitaciones.forEach(habitacion => {
          this.todasLasAsignaciones.push({
            habitacion: habitacion,
            personas: []
          });
        });

        this.actualizarPoolDeDisponibles();
      },
      error: (err) => {
        console.error('Error al cargar datos iniciales:', err);
      }
    });
  }

  // --- Lógica de Drag & Drop ---

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.actualizarPoolDeDisponibles();
    }
  }

  getAllConnectedListIds(): string[] {
    const listIds: string[] = ['personas-disponibles-list'];
    this.todasLasHabitaciones.forEach(hab => {
      listIds.push(`habitacion-${hab.id}-list`);
    });
    return listIds;
  }

  predicate = (drag: CdkDrag<string>, drop: CdkDropList<string[]>) => {
    if (drop.id === 'personas-disponibles-list') {
      return true;
    }

    const habitacionId = this.extractHabitacionIdFromListId(drop.id);
    const asignacion = this.getAsignacionForHabitacion(habitacionId);

    if (asignacion) {
      const currentOccupancy = asignacion.personas.length;
      const capacity = asignacion.habitacion.capacidad;

      const canDrop = currentOccupancy < capacity;
      
      return canDrop;
    }
    return false;
  };

  private extractHabitacionIdFromListId(listId: string): number {
    const parts = listId.split('-');
    if (parts.length >= 2 && parts[0] === 'habitacion' && parts[2] === 'list') {
      return parseInt(parts[1], 10);
    }
    
    return -1; // Retorna un valor que indique un error
  }

  getAsignacionForHabitacion(habitacionId: number): Asignacion | undefined {
    return this.todasLasAsignaciones.find(asignacion => asignacion.habitacion.id === habitacionId);
  }

  actualizarPoolDeDisponibles(): void {
    const assignedPeopleNames = new Set<string>();
    this.todasLasAsignaciones.forEach(asignacion => {
      asignacion.personas.forEach(personaNombre => assignedPeopleNames.add(personaNombre));
    });

    this.personasDisponibles = this.todosLosUsuariosLanding
      .map(u => u.usuario.nombre)
      .filter(nombre => !assignedPeopleNames.has(nombre));
  }
}