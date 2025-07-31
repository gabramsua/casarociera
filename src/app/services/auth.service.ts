import { Injectable } from '@angular/core';
import { ParticipanteRomeria, Usuario, UsuarioLanding } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly key = 'usuario';
  private readonly participanteromeria = 'participanteromeria';

  setUsuario(usuario: Usuario): void {
    localStorage.setItem(this.key, JSON.stringify(usuario));
  }

  getUsuario(): Usuario | null {
    const usuarioString = localStorage.getItem(this.key);

    if (usuarioString) { // Si existe el string en localStorage
      try {
        // Intentamos parsear. Si el JSON es inválido, catch el error.
        return JSON.parse(usuarioString) as Usuario;
      } catch (e) {
        console.error("Error al parsear el usuario desde localStorage:", e);
        return null; // Si hay un error, devolvemos null
      }
    }
    return null;
  }

  setParticipanteRomeria(participante: UsuarioLanding): void {
    localStorage.setItem(this.participanteromeria, JSON.stringify(participante));
  }

  getParticipanteRomeria(): ParticipanteRomeria | null {
    const particRomeria = localStorage.getItem(this.participanteromeria);

    if(particRomeria) { // Si existe el string en localStorage
      try {
        // Intentamos parsear. Si el JSON es inválido, catch el error.
        return JSON.parse(particRomeria) as ParticipanteRomeria;
      } catch (e) {
        console.error("Error al parsear el participante de romería desde localStorage:", e);
        return null; // Si hay un error, devolvemos null
      }
    }
    return null;
  }

  logout() {
    localStorage.removeItem(this.key);
  }

  isLoggedIn(): boolean {
    return this.getUsuario() !== null;
  }
}
