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
    admin?: boolean;
    ultimaConexion: Date;
}

export interface Year {
    id: number;
    year: number;
    nombre: string;
    active: boolean;
    casa: Casa;
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
    logged: boolean;
    costo: number;
    totalAportado: number;
}
export interface Categoria {
    id: number;
    nombre: string;
}
export interface Habitacion {
    id: number;
    nombre: string;
    capacidad: number;
    casa: Casa
}

export interface Propuesta {
    id: number;
    fecha: Date;
    participanteromeria: ParticipanteRomeria;
}
export interface TipoSelect {
    value: string | number;
    viewValue: string;
}
export interface Casa {
    id: number;
    nombre: string;
    modTurnosComidas: boolean;
}
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
///                          CUSTOM POJOS                           ////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
export interface ActiveEvento {
    year: Year;
    nombreCasa: string;
}

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

export interface ComidasEventoActivo {
    id: number;
    horario: string;
    nombre: string;
    platoPrincipal: string;
    year: Year;
}


export interface VotoResumen {
  id: number;
  nombreUsuario: string;
  fecha: string;
  votosAFavor: string[];
  votosEnContra: string[];
}

export interface DetalleCompletoPropuestaAsignacion {
    asignaciones: Asignacion[];
    votosAFavor: string[]; 
    votosEnContra: string[];
}

export interface Asignacion {
    habitacion: Habitacion;
    personas: string[];
}

export interface VotarRequest {
	idPropuesta: number;
    idParticipanteromeria: number;
    isAFavor: boolean;
}

export interface PropuestaCreateRellenaRequest {
    participante: ParticipanteRomeria;
    fecha: Date;
    asignaciones: {idHabitacion: number, nombrePersona: string}[];
}

export interface BalanceDeEventoResponse {
    casa: Casa;
    year: Year;
    totalGastos: number;
    totalIngresos: number;
    balanceNeto: number;
    detalles: Balance[];
}

export interface BalanceDeEventoCabecera {
    casa: Casa;
    year: Year;
    totalGastos: number;
    totalIngresos: number;
    balanceNeto: number;
}