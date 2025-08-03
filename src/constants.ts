const Constants = {
    COLLECTION: {
        USUARIO: 'usuario',
        BALANCE: 'balance',
        YEAR: 'year',
        CATEGORIA: 'categoria',
        PARTICIPANTE_ROMERIA: 'participanteromeria',
        TURNO_COMIDA: 'turnocomida',
        PARTICIPANTE_COMIDA: 'participantecomida',
        HABITACION: 'habitacion',
        PROPUESTA: 'propuesta',
        VOTO_PROPUESTA: 'votopropuesta',
        PROPUESTA_ASIGNACION: 'propuestaasignacion',
    },
    END_POINTS: {
        ACTIVE_EVENTO: 'eventoActivo',
        BALANCE_EVENTO: 'balanceDeEvento',
        COMIDAS_EVENTO_ACTIVO: 'comidasEventoActivo',
        GET_ALL_PARTICIPANTES_ACTIVOS: 'participantesActivos',
        PARTICIPANTES_COMIDAS_EVENTO_ACTIVO: 'participantesComidasDeEventoActivo',
        PROPUESTAS_EVENTO_ACTIVO: 'propuestasEventoActivo',
        PROPUESTA_CREATE_RELLENA: 'rellenaPropuesta',
        ULTIMOS_10_GASTOS: 'ultimosGastos',
        VOTOS_PROPUESTAS_EVENTO_ACTIVO: 'votopropuestasEventoActivo',
        VOTAR: 'votar',
    },
    TIPOS_MOVIMIENTO: [
        {value: 2, viewValue: 'Ver Todos' },
        {value: 1, viewValue: 'Ingreso' },
        {value: 0, viewValue: 'Gasto' },
    ],
    DIALOG_WIDTH: '80%',
    DIALOG_HEIGHT: '80%',
};

export default Constants