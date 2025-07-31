import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, pairwise, startWith, Subscription } from 'rxjs';
import { TipoSelect, Usuario, UsuarioLanding } from 'src/app/models/models';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { fadeInUp } from 'src/app/shared/animations/fadeInUp';
import Constants from 'src/constants';

@Component({
    selector: 'app-landing-selector-usuario',
    templateUrl: './landing-selector-usuario.component.html',
    styleUrls: ['./landing-selector-usuario.component.scss'],
    standalone: false,
    animations: [fadeInUp]
})
export class LandingSelectorUsuarioComponent {
  usuarios: UsuarioLanding[] = [];
  usuarioSeleccionadoId: number | null = null;
  entityForm!: FormGroup;
  filteredOptions!: Observable<TipoSelect[]>;
  myControl = new FormControl('');
  usuariosList:TipoSelect[] = [];
  selectedUsuario!: Usuario;
  flagFadeIn = false;

  private isUserSelected: boolean = false; // NUEVO: Bandera para saber si se ha seleccionado un usuario
  private controlSubscription!: Subscription; // NUEVO: Para desuscribirse de valueChanges

  constructor(private auth: AuthService, private router: Router, private api: ApiService, private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    
    this.entityForm = this._formBuilder.group({
      usuario: new FormControl('', []),
    });

    this.api.getAllByCasa(Constants.END_POINTS.GET_ALL_PARTICIPANTES_ACTIVOS).subscribe((usuarios) => {
      this.usuarios = usuarios;
      usuarios.forEach((user: UsuarioLanding) => {
          this.usuariosList.push({
            value: user.id,
            viewValue: user.usuario.nombre
          })
        });
    });
    
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );


    // Suscripción para detectar escritura después de la selección
    this.controlSubscription = this.myControl.valueChanges.subscribe(value => {
      // Si un usuario ya ha sido seleccionado Y el valor actual no coincide con el viewValue del usuario seleccionado
      if (this.isUserSelected && this.usuariosList.find(u => u.value === this.usuarioSeleccionadoId)?.viewValue !== value) {
        this.myControl.setValue('', { emitEvent: false }); // Borra el contenido sin disparar otro evento
        // Opcional: Si quieres que el botón "Entrar" desaparezca al empezar a reescribir:
        this.usuarioSeleccionadoId = null;
        this.isUserSelected = false;
      }
    });
    this.flagFadeIn = true;
  }
  ngOnDestroy(): void {
    if (this.controlSubscription) {
      this.controlSubscription.unsubscribe();
    }
  }

  private _filter(value: string): TipoSelect[] {
    const filterValue = value.toLowerCase();
    // Resetear el estado de selección si el usuario vuelve a escribir
    if (this.isUserSelected && this.usuariosList.find(u => u.value === this.usuarioSeleccionadoId)?.viewValue !== value) {
        this.isUserSelected = false;
        this.usuarioSeleccionadoId = null; // Opcional: para ocultar el botón si empieza a escribir de nuevo
    }
    return this.usuariosList.filter(option => option.viewValue.toLowerCase().includes(filterValue));
  }

  selectUsuario(userViewValue: string) {
    // this.usuarioSeleccionadoId = parseInt(this.usuariosList.filter(x => x.viewValue === user)[0].value as string);
     const selected = this.usuariosList.find(x => x.viewValue === userViewValue);
    if (selected) {
      this.usuarioSeleccionadoId = parseInt(selected.value as string);
      this.isUserSelected = true; // NUEVO: Marcamos que se ha seleccionado un usuario
    } else {
      this.usuarioSeleccionadoId = null;
      this.isUserSelected = false;
    }
  }

  entrar() {
    const usuario = this.usuarios.find(u => u.id === this.usuarioSeleccionadoId);
    if (usuario) {
      this.auth.setUsuario(usuario.usuario);
      this.auth.setParticipanteRomeria(usuario);
      this.router.navigate(['/home']);
    }
  }
}
