export interface UsuarioLanding {
    id: number;
    usuario: Usuario;
    year: Year;
    logged: boolean;
}

export interface Usuario {
    id: number;
    nombre: string;
    isAdmin: boolean;
    ultimaConexion: Date;
}

export interface Year {
    id: number;
    year: number;
    nombre: string;
    active: boolean
}