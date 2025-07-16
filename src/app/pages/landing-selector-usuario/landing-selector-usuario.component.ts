import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, pairwise, startWith } from 'rxjs';
import { TipoSelect, Usuario, UsuarioLanding } from 'src/app/models/models';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import Constants from 'src/constants';

@Component({
  selector: 'app-landing-selector-usuario',
  templateUrl: './landing-selector-usuario.component.html',
  styleUrls: ['./landing-selector-usuario.component.scss']
})
export class LandingSelectorUsuarioComponent {
  usuarios: UsuarioLanding[] = [];
  usuarioSeleccionadoId: number | null = null;
  entityForm!: FormGroup;
  filteredOptions!: Observable<TipoSelect[]>;
  myControl = new FormControl('');
  usuariosList:TipoSelect[] = [];
  selectedUsuario!: Usuario;

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
  }

  private _filter(value: string): TipoSelect[] {
    const filterValue = value.toLowerCase();

    return this.usuariosList.filter(option => option.viewValue.toLowerCase().includes(filterValue));
  }

  selectUsuario(user: string) {
    this.usuarioSeleccionadoId = parseInt(this.usuariosList.filter(x => x.viewValue === user)[0].value as string);
  }

  entrar() {
    const usuario = this.usuarios.find(u => u.id === this.usuarioSeleccionadoId);
    if (usuario) {
      this.auth.setUsuario(usuario.usuario);
      this.router.navigate(['/home']);
    }
  }
}
