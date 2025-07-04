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

export interface Balance {
    id: number;
    concepto: string;
    fecha: Date,
    importe: number,
    isIngreso: boolean,
    urlTicket: string,
    categoria: Categoria;
    participanteromeria : ParticipanteRomeria;
}
export interface ParticipanteRomeria {
    id: number;
    usuario: Usuario;
    year: Year;
    logged: boolean
}
export interface Categoria {
    id: number;
    nombre: string;
}

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
///                          CUSTOM POJOS                           ////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
export interface UltimosGastos {    
    id: number;
    concepto: string;
    fecha: Date,
    importe: number,
    isIngreso: boolean,
    urlTicket: string,
    categoria: Categoria;
    participanteromeria : ParticipanteRomeria;
}