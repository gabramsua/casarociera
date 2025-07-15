import { Injectable } from '@angular/core';
import { Usuario } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly key = 'usuario';

  setUsuario(usuario: Usuario): void {
    localStorage.setItem(this.key, JSON.stringify(usuario));
  }

  getUsuario(): string | null {
    return localStorage.getItem(this.key);
  }

  logout() {
    localStorage.removeItem(this.key);
  }

  isLoggedIn(): boolean {
    return this.getUsuario() !== null;
  }
}
