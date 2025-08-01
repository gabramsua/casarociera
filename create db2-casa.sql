-- Crear base de datos
CREATE DATABASE IF NOT EXISTS pena_rociera CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Seleccionar base de datos
USE pena_rociera;

-- Tabla Casa (Pivote para Multi-tenant)
CREATE TABLE Casa (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    modTurnosComida BOOLEAN DEFAULT FALSE,
    modHabitaciones BOOLEAN DEFAULT FALSE,
    modBalances BOOLEAN DEFAULT FALSE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tablas Principales con FK a Casa
CREATE TABLE Usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    ultimaConexion DATE,
    isAdmin BOOLEAN DEFAULT FALSE,
    idCasa INT NOT NULL, -- FK a Casa
    FOREIGN KEY (idCasa) REFERENCES Casa(id)
);

CREATE TABLE Year (
    id INT PRIMARY KEY AUTO_INCREMENT,
    year INT NOT NULL,
    nombre VARCHAR(100),
    isActive tinyint not null,
    idCasa INT NOT NULL, -- FK a Casa
    FOREIGN KEY (idCasa) REFERENCES Casa(id)
);

CREATE TABLE Categoria (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    idCasa INT NOT NULL, -- FK a Casa
    FOREIGN KEY (idCasa) REFERENCES Casa(id)
);

CREATE TABLE Habitacion (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    capacidad INT NOT NULL,
    idCasa INT NOT NULL, -- FK a Casa
    FOREIGN KEY (idCasa) REFERENCES Casa(id)
);

-- Tablas Secundarias (con relaciones a tablas vinculadas a Casa)
CREATE TABLE ParticipanteRomeria (
    id INT PRIMARY KEY AUTO_INCREMENT,
    idUsuario INT NOT NULL,
    idYear INT NOT NULL,
    isLogged tinyint not null,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id),
    FOREIGN KEY (idYear) REFERENCES Year(id)
);

CREATE TABLE TurnoComida (
    id INT PRIMARY KEY AUTO_INCREMENT,
    idYear INT NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    platoPrincipal VARCHAR(255),
    horario VARCHAR(255),
    FOREIGN KEY (idYear) REFERENCES Year(id)
);

CREATE TABLE ParticipanteComida (
    id INT PRIMARY KEY AUTO_INCREMENT,
    idParticipanteRomeria INT NOT NULL,
    idTurnoComida INT NOT NULL,
    FOREIGN KEY (idParticipanteRomeria) REFERENCES ParticipanteRomeria(id),
    FOREIGN KEY (idTurnoComida) REFERENCES TurnoComida(id)
);

CREATE TABLE Balance (
    id INT PRIMARY KEY AUTO_INCREMENT,
    idParticipanteRomeria INT NOT NULL,
    idCategoria INT NOT NULL,
    isIngreso BOOLEAN NOT NULL,
    importe DOUBLE NOT NULL,
    fecha DATE NOT NULL,    
    concepto VARCHAR(255),
    urlTicket VARCHAR(512),
    idCasa INT NOT NULL, -- << AÑADIDO: FK a Casa directamente
    FOREIGN KEY (idParticipanteRomeria) REFERENCES ParticipanteRomeria(id),
    FOREIGN KEY (idCategoria) REFERENCES Categoria(id),
    FOREIGN KEY (idCasa) REFERENCES Casa(id) -- << AÑADIDO: Restricción FK
);

CREATE TABLE Propuesta (
    id INT PRIMARY KEY AUTO_INCREMENT,
    idParticipanteRomeria INT NOT NULL,
    fecha DATE NOT NULL,
    FOREIGN KEY (idParticipanteRomeria) REFERENCES ParticipanteRomeria(id)
);

CREATE TABLE VotoPropuesta (
    id INT PRIMARY KEY AUTO_INCREMENT,
    idPropuesta INT NOT NULL,
    idParticipanteRomeria INT NOT NULL,
    isAFavor BOOLEAN NOT NULL,
    FOREIGN KEY (idPropuesta) REFERENCES Propuesta(id),
    FOREIGN KEY (idParticipanteRomeria) REFERENCES ParticipanteRomeria(id)
);

CREATE TABLE PropuestaAsignacion (
    id INT PRIMARY KEY AUTO_INCREMENT,
    idPropuesta INT NOT NULL,
    idHabitacion INT NOT NULL,
    persona VARCHAR(255) NOT NULL,
    FOREIGN KEY (idPropuesta) REFERENCES Propuesta(id),
    FOREIGN KEY (idHabitacion) REFERENCES Habitacion(id)
);