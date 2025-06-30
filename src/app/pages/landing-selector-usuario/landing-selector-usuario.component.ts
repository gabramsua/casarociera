import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/models';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import Constants from 'src/constants';

@Component({
  selector: 'app-landing-selector-usuario',
  templateUrl: './landing-selector-usuario.component.html',
  styleUrls: ['./landing-selector-usuario.component.scss']
})
export class LandingSelectorUsuarioComponent {
  usuarios: Usuario[] = [];
  usuarioSeleccionadoId: number | null = null;


  constructor(private auth: AuthService, private router: Router, private api: ApiService) {}

  ngOnInit(): void {
    this.api.getAll(Constants.COLLECTION.USUARIO).subscribe((usuarios) => {
      this.usuarios = usuarios;
    });
  }

  entrar() {
    const usuario = this.usuarios.find(u => u.id === this.usuarioSeleccionadoId);
    if (usuario) {
      this.auth.setUsuario(usuario.nombre); // o puedes guardar el id también
      this.router.navigate(['/home']);
    }
  }
}
