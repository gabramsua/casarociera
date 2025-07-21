-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema pena_rociera
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema pena_rociera
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `pena_rociera` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
USE `pena_rociera` ;

-- -----------------------------------------------------
-- Table `pena_rociera`.`casa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pena_rociera`.`casa` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `modTurnosComida` BIT(1) NOT NULL,
  `nombre` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `pena_rociera`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pena_rociera`.`usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  `ultimaConexion` DATE NULL DEFAULT NULL,
  `isAdmin` TINYINT NOT NULL,
  `idCasa` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKakxmhh8nedkukd7shwaffrx20` (`idCasa` ASC) VISIBLE,
  CONSTRAINT `FKakxmhh8nedkukd7shwaffrx20`
    FOREIGN KEY (`idCasa`)
    REFERENCES `pena_rociera`.`casa` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `pena_rociera`.`year`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pena_rociera`.`year` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `year` INT NOT NULL,
  `nombre` VARCHAR(255) NULL DEFAULT NULL,
  `isActive` BIT(1) NULL DEFAULT NULL,
  `idCasa` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKpdf70vwmqyf5by1beo87ll73w` (`idCasa` ASC) VISIBLE,
  CONSTRAINT `FKpdf70vwmqyf5by1beo87ll73w`
    FOREIGN KEY (`idCasa`)
    REFERENCES `pena_rociera`.`casa` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `pena_rociera`.`participanteromeria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pena_rociera`.`participanteromeria` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idUsuario` INT NOT NULL,
  `idYear` INT NOT NULL,
  `isLogged` BIT(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `idUsuario` (`idUsuario` ASC) VISIBLE,
  INDEX `idYear` (`idYear` ASC) VISIBLE,
  CONSTRAINT `participanteromeria_ibfk_1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `pena_rociera`.`usuario` (`id`),
  CONSTRAINT `participanteromeria_ibfk_2`
    FOREIGN KEY (`idYear`)
    REFERENCES `pena_rociera`.`year` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `pena_rociera`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pena_rociera`.`categoria` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  `idCasa` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK3if9a1hbt4tg727l103hy5k99` (`idCasa` ASC) VISIBLE,
  CONSTRAINT `FK3if9a1hbt4tg727l103hy5k99`
    FOREIGN KEY (`idCasa`)
    REFERENCES `pena_rociera`.`casa` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `pena_rociera`.`balance`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pena_rociera`.`balance` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idParticipanteRomeria` INT NOT NULL,
  `idCategoria` INT NOT NULL,
  `isIngreso` TINYINT NOT NULL,
  `importe` DOUBLE NOT NULL,
  `fecha` DATE NOT NULL,
  `concepto` VARCHAR(255) NULL DEFAULT NULL,
  `urlTicket` VARCHAR(255) NULL DEFAULT NULL,
  `idCasa` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `idParticipanteRomeria` (`idParticipanteRomeria` ASC) VISIBLE,
  INDEX `idCategoria` (`idCategoria` ASC) VISIBLE,
  INDEX `FKqh0r47qw8ktciklcsoygk8ove` (`idCasa` ASC) VISIBLE,
  CONSTRAINT `balance_ibfk_2`
    FOREIGN KEY (`idParticipanteRomeria`)
    REFERENCES `pena_rociera`.`participanteromeria` (`id`),
  CONSTRAINT `balance_ibfk_3`
    FOREIGN KEY (`idCategoria`)
    REFERENCES `pena_rociera`.`categoria` (`id`),
  CONSTRAINT `FKqh0r47qw8ktciklcsoygk8ove`
    FOREIGN KEY (`idCasa`)
    REFERENCES `pena_rociera`.`casa` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `pena_rociera`.`habitacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pena_rociera`.`habitacion` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  `capacidad` INT NOT NULL,
  `idCasa` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK729j50squpabt57nc6preuvbb` (`idCasa` ASC) VISIBLE,
  CONSTRAINT `FK729j50squpabt57nc6preuvbb`
    FOREIGN KEY (`idCasa`)
    REFERENCES `pena_rociera`.`casa` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `pena_rociera`.`turnocomida`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pena_rociera`.`turnocomida` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idYear` INT NOT NULL,
  `nombre` VARCHAR(255) NOT NULL,
  `platoPrincipal` VARCHAR(255) NULL DEFAULT NULL,
  `horario` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `idYear` (`idYear` ASC) VISIBLE,
  CONSTRAINT `turnocomida_ibfk_1`
    FOREIGN KEY (`idYear`)
    REFERENCES `pena_rociera`.`year` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `pena_rociera`.`participantecomida`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pena_rociera`.`participantecomida` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idParticipanteRomeria` INT NULL DEFAULT NULL,
  `idTurnoComida` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK90r3etcqco6i70fcnt1qcfuiu` (`idParticipanteRomeria` ASC) VISIBLE,
  INDEX `FKsitivkvvcgp2nf4a0b8idy0vm` (`idTurnoComida` ASC) VISIBLE,
  CONSTRAINT `FK90r3etcqco6i70fcnt1qcfuiu`
    FOREIGN KEY (`idParticipanteRomeria`)
    REFERENCES `pena_rociera`.`participanteromeria` (`id`),
  CONSTRAINT `FKsitivkvvcgp2nf4a0b8idy0vm`
    FOREIGN KEY (`idTurnoComida`)
    REFERENCES `pena_rociera`.`turnocomida` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `pena_rociera`.`propuesta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pena_rociera`.`propuesta` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idParticipanteRomeria` INT NOT NULL,
  `fecha` DATE NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `idParticipanteRomeria` (`idParticipanteRomeria` ASC) VISIBLE,
  CONSTRAINT `propuesta_ibfk_1`
    FOREIGN KEY (`idParticipanteRomeria`)
    REFERENCES `pena_rociera`.`participanteromeria` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 12
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `pena_rociera`.`propuestaasignacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pena_rociera`.`propuestaasignacion` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idPropuesta` INT NOT NULL,
  `idHabitacion` INT NOT NULL,
  `persona` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `idPropuesta` (`idPropuesta` ASC) VISIBLE,
  INDEX `idHabitacion` (`idHabitacion` ASC) VISIBLE,
  CONSTRAINT `propuestaasignacion_ibfk_1`
    FOREIGN KEY (`idPropuesta`)
    REFERENCES `pena_rociera`.`propuesta` (`id`),
  CONSTRAINT `propuestaasignacion_ibfk_2`
    FOREIGN KEY (`idHabitacion`)
    REFERENCES `pena_rociera`.`habitacion` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 22
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `pena_rociera`.`votopropuesta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pena_rociera`.`votopropuesta` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idPropuesta` INT NOT NULL,
  `idParticipanteRomeria` INT NOT NULL,
  `isAFavor` TINYINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `idPropuesta` (`idPropuesta` ASC) VISIBLE,
  INDEX `idParticipanteRomeria` (`idParticipanteRomeria` ASC) VISIBLE,
  CONSTRAINT `votopropuesta_ibfk_1`
    FOREIGN KEY (`idPropuesta`)
    REFERENCES `pena_rociera`.`propuesta` (`id`),
  CONSTRAINT `votopropuesta_ibfk_2`
    FOREIGN KEY (`idParticipanteRomeria`)
    REFERENCES `pena_rociera`.`participanteromeria` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 30
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
