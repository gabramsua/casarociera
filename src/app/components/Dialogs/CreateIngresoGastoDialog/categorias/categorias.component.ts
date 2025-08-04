import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Categoria } from 'src/app/models/models';
import { ApiService } from 'src/app/services/api.service';
import Constants from 'src/constants';

@Component({
  selector: 'app-categorias',
  standalone: false,
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.scss'
})
export class CategoriasComponent {
  @Output() formSubmittedEvent = new EventEmitter<string>();
  @Output() selectedCategoriaEvent = new EventEmitter<number>();

  categorias: { value: string; viewValue: string }[] = [];
  selectedCategoria: string = '';
  flagShowCrearCategoria: boolean = false;
  categoriaForm!: FormGroup;
  private formSubscription: Subscription | null = null; // Para guardar la suscripción y poder cancelarla

    
  constructor(private api: ApiService) { 
    this.categoriaForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

    ngOnInit(): void {
      this.loadData();
      this.formSubscription = this.categoriaForm.valueChanges.subscribe(values => {
        // Comprobar la validez del formulario en cada cambio
        if (this.categoriaForm.valid) {
          const nombreIngresado = values.nombre;
          this.formSubmittedEvent.emit(nombreIngresado); // Emitir el nombre si es válido
        }
      });
    }
    ngOnDestroy(): void {
      if (this.formSubscription) {
        this.formSubscription.unsubscribe();
      }
    }
    loadData() {
      this.api.getAllByCasa(Constants.COLLECTION.CATEGORIA+'s').subscribe((response: Categoria[]) => {
          this.categorias = response.map(categoria => ({
              value: categoria.id.toString(), // Asumiendo que el ID es un número
              viewValue: categoria.nombre
          }));
          
          this.categorias.sort((a, b) => {
            const nameA = a.viewValue.toUpperCase();
            const nameB = b.viewValue.toUpperCase();
            return nameA.localeCompare(nameB); // Una forma más concisa de comparar cadenas
          });
          this.categorias.unshift({ value: 'crear', viewValue: 'Crear Nueva' });
      });
    }

    handleCategoriaSelected() {
      if (this.selectedCategoria === 'crear') {
        this.flagShowCrearCategoria = true;
      } else {
        this.flagShowCrearCategoria = false;
        // Avisar al padre de que está listo para pasar de step
          this.selectedCategoriaEvent.emit(parseInt(this.selectedCategoria)); // Emitir el nombre si es válido
        
      }
    }
     get nombreControl() {
      return this.categoriaForm.get('nombre') as FormControl;
    }
}
