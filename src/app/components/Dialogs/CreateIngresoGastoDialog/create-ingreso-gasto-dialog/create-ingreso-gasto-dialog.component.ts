import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { startWith, pairwise } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import Constants from 'src/constants';

@Component({
  selector: 'app-create-ingreso-gasto-dialog',
  templateUrl: './create-ingreso-gasto-dialog.component.html',
  styleUrl: './create-ingreso-gasto-dialog.component.scss',
  standalone: false,
})
export class CreateIngresoGastoDialogComponent {
  @ViewChild('stepper') private myStepper!: MatStepper;
  
  entityForm!: FormGroup;
  flagCategoriaSelected: boolean = false;
  categoriaSelectedId: number | null = null;
  flagCategoriaCreada: boolean = false;
  categoriaCreadaNombre: string = '';

  constructor(
    public dialogRef: MatDialogRef<CreateIngresoGastoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private api: ApiService,
    private loaderService: CommonService
  ) {}
  
  ngOnInit(): void {
    this.entityForm = this._formBuilder.group({
      concepto: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      fecha: new FormControl('', [Validators.required]),
      importe: new FormControl('', [Validators.required, Validators.min(0.01), Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
    })
    // Nos suscribimos al OnChanges para actualizar los datos tras algún cambio de resultado
    this.entityForm.valueChanges
      .pipe(startWith(null), pairwise())
      .subscribe(([prev, next]: [any, any]) => {
          this.data.datos.concepto = this.entityForm.controls['concepto'].value
          this.data.datos.fecha = this.entityForm.controls['fecha'].value
          this.data.datos.importe = this.entityForm.controls['importe'].value
          this.data.datos.categoriaSelectedId = this.categoriaSelectedId;
       } );
  }
  onFormularioValido(nombre: string): void {
    if (!nombre) {
      return;
    }
    this.categoriaCreadaNombre = nombre;
    this.flagCategoriaCreada = true;
    this.flagCategoriaSelected = false;
  }
  onCategoriaSelected(categoriaId: number): void {
    if (categoriaId) {
      this.flagCategoriaSelected = true;
      this.categoriaSelectedId = categoriaId;
      this.flagCategoriaCreada = false; // Reseteamos el flag de categoría creada
    }
  }
  disableSiguiente(){
    return this.flagCategoriaSelected || this.flagCategoriaCreada;
  }

  handleAvanzarEstado(){
    if(this.flagCategoriaCreada){
        this.loaderService.showLoader()
      const body: any = {
        nombre: this.categoriaCreadaNombre,
        casa: { id: environment.casa }
      }
      this.api.post(Constants.COLLECTION.CATEGORIA, body).subscribe((response: any) => {
        this.categoriaSelectedId = response.id; // Asignamos el ID de la nueva categoría
        this.myStepper.next();
        this.loaderService.hideLoader();
      });
    } else if(this.flagCategoriaSelected){
      this.myStepper.next();
    }
  }

  disableGuardar() {
    return  this.entityForm.controls['concepto'].value != ''  && this.entityForm.controls['concepto'].valid &&
     this.entityForm.controls['fecha'].value != '' && this.entityForm.controls['fecha'].valid &&
     this.entityForm.controls['importe'].value != '' && this.entityForm.controls['importe'].valid;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

    // Métodos getter para acceder fácilmente a los controles en la plantilla
  get conceptoControl() {
    return this.entityForm.get('concepto') as FormControl;
  }

  get fechaControl() {
    return this.entityForm.get('fecha') as FormControl;
  }

  get importeControl() {
    return this.entityForm.get('importe') as FormControl;
  }
}
