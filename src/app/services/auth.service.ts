import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly key = 'usuario';

  setUsuario(nombre: string) {
    localStorage.setItem(this.key, nombre);
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
