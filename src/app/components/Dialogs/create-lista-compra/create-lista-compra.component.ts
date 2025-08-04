import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { startWith, pairwise } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-create-lista-compra',
  standalone: false,
  templateUrl: './create-lista-compra.component.html',
  styleUrl: './create-lista-compra.component.scss'
})
export class CreateListaCompraComponent {
  entityForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateListaCompraComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private api: ApiService
  ) {}
  
  ngOnInit(): void {
    this.entityForm = this._formBuilder.group({
      nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)])
    })
    // Nos suscribimos al OnChanges para actualizar los datos tras algún cambio de resultado
    this.entityForm.valueChanges
      .pipe(startWith(null), pairwise())
      .subscribe(([prev, next]: [any, any]) => {
          this.data.nuevaListaNombre = this.entityForm.controls['nombre'].value;
       } );
  }
  
  disableGuardar() {
    return  this.entityForm.controls['nombre'].value != ''  && this.entityForm.controls['nombre'].valid;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }  
  
  get nombreControl() {
    return this.entityForm.get('nombre') as FormControl;
  }
}
