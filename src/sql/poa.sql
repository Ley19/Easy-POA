-- --------------------------------------------------------
-- Host:                         easypoa.cxvh0pslqhaf.us-east-2.rds.amazonaws.com
-- Server version:               8.0.28 - Source distribution
-- Server OS:                    Linux
-- HeidiSQL Version:             12.2.0.6576
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for EasyPOA
CREATE DATABASE IF NOT EXISTS `EasyPOA`;
USE `EasyPOA`;

-- Dumping structure for table EasyPOA.actividad
CREATE TABLE IF NOT EXISTS `actividad` (
  `idActividad` varchar(3) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `nombre` varchar(104) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `componente` varchar(91) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `areaSuperior` varchar(49) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `unidadAdministrativa` varchar(57) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`idActividad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish_ci COMMENT='Tabla para enlistar los datos de las 22 actividades dentro de la Universidad Politecnica de Pachuca';

-- Dumping data for table EasyPOA.actividad: ~22 rows (approximately)
INSERT INTO `actividad` (`idActividad`, `nombre`, `componente`, `areaSuperior`, `unidadAdministrativa`) VALUES
	('1.1', 'Colocacion de estudiantes de Educacion Superior en servicio social, estadias o residencias profesionales', '1 - Estudiantes de Educacion Superior en las Instituciones Publicas formados', 'DIRECCION DE VINCULACION Y EXTENSION', 'SAC000.-Secretaria academica'),
	('1.2', 'Aprobacion de adecuaciones curriculares de planes y programas de estudio de Educacion Superior', '1 - Estudiantes de Educacion Superior en las Instituciones Publicas formados', 'SECRETARIA ACADEMICA', 'SAC000.-Secretaria academica'),
	('1.3', 'Diagnostico a aspirantes de Educacion Superior', '1 - Estudiantes de Educacion Superior en las Instituciones Publicas formados', 'DIRECCION DE PLANEACION', 'SAC000.-Secretaria academica'),
	('1.4', 'Imparticion de actividades extracurriculares en Educacion Superior', '1 - Estudiantes de Educacion Superior en las Instituciones Publicas formados', 'SECRETARIA ACADEMICA', 'SAC000.-Secretaria academica'),
	('1.5', 'Atencion compensatoria a estudiantes de Educacion Superior', '1 - Estudiantes de Educacion Superior en las Instituciones Publicas formados', 'SECRETARIA ACADEMICA', 'SAC000.-Secretaria academica'),
	('1.6', 'Capacitacion del personal docente de Educacion Superior', '1 - Estudiantes de Educacion Superior en las Instituciones Publicas formados', 'SECRETARIA ACADEMICA', 'SAC000.-Secretaria academica'),
	('1.7', 'Otorgamiento de becas institucionales a estudiantes de Educacion Superior', '1 - Estudiantes de Educacion Superior en las Instituciones Publicas formados', 'DIRECCION DE PLANEACION', 'SAC000.-Secretaria academica'),
	('1.8', 'Distribucion de material didactico a docentes de Educacion Superior', '1 - Estudiantes de Educacion Superior en las Instituciones Publicas formados', 'SECRETARIA ACADEMICA', 'SAC000.-Secretaria academica'),
	('2.1', 'Otorgamiento de servicios de educacion continua y tecnologicos de Educacion Superior', '2 - Servicios de extension y vinculacion de Educacion Superior otorgados', 'DIRECCION DE VINCULACION Y EXTENSION', 'DCS001.-Direccion de comunicacion social'),
	('2.2', 'Difusion institucional de Educacion Superior', '2 - Servicios de extension y vinculacion de Educacion Superior otorgados', 'DIRECCION DE COMUNICACION SOCIAL', 'DCS001.-Direccion de comunicacion social'),
	('2.3', 'Otorgamiento de orientacion vocacional para Educacion Superior', '2 - Servicios de extension y vinculacion de Educacion Superior otorgados', 'DIRECCION DE COMUNICACION SOCIAL', 'DCS001.-Direccion de comunicacion social'),
	('2.4', 'Firma de convenios de colaboracion en Educacion Superior', '2 - Servicios de extension y vinculacion de Educacion Superior otorgados', 'DIRECCION DE COMUNICACION SOCIAL', 'DCS001.-Direccion de comunicacion social'),
	('3.1', 'Realizacion de productos de investigaciones cientifica y tecnologica de Educacion Superior', ' 3 - Investigacion cientifica, tecnologica y educativa realizada', 'DIRECCION DE INVESTIGACION, INNOVACION Y POSGRADO', 'DIT000.-Direccion de investigacion, innovacion y posgrado'),
	('3.2', 'Desarrollo de proyectos de investigacion educativa en Educacion Superior', '3 - Investigacion cientifica, tecnologica y educativa realizada', 'DIRECCION DE INVESTIGACION, INNOVACION Y POSGRADO', 'DIT000.-Direccion de investigacion, innovacion y posgrado'),
	('4.1', 'Gestion de evaluaciones a la Institucion de Educacion Superior', '4 - Instrumentos  de planeacion estrategica implementados', 'DDIRECCION DE PLANEACION', 'SDI000-Direccion de planeacion'),
	('4.2', 'Evaluacion a docentes de Educacion Superior', '4 - Instrumentos  de planeacion estrategica implementados', 'DDIRECCION DE PLANEACION', 'SDI000-Direccion de planeacion'),
	('4.3', 'Implementacion de modulos de Sistemas de Informacion en la Institucion Educativa', '4 - Instrumentos  de planeacion estrategica implementados', 'DIRECCION DE PLANEACION', 'SDI000-Direccion de planeacion'),
	('5.1', 'Capacitacion a servidores publicos de Educacion Superior', '5 - Programa de gestion administrativa de las instituciones de educacion superior ejecutado', 'SECRETARIA ADMINISTRATIVA', 'SAD000.-Secretaria administrativa'),
	('5.2', 'Gestion de infraestructura en Educacion Superior', '5 - Programa de gestion administrativa de las instituciones de educacion superior ejecutado', 'SECRETARIA ADMINISTRATIVA', 'SAD000.-Secretaria administrativa'),
	('5.3', 'Mantenimiento a la infraestructura fisica educativa de Educacion Superior', '5 - Programa de gestion administrativa de las instituciones de educacion superior ejecutado', 'SECRETARIA ADMINISTRATIVA', 'SAD000.-Secretaria administrativa'),
	('5.4', 'Distribucion de mobiliario y equipo en Educacion Superior', '5 - Programa de gestion administrativa de las instituciones de educacion superior ejecutado', 'SECRETARIA ADMINISTRATIVA', 'SAD000.-Secretaria administrativa'),
	('5.5', 'Administracion de los recursos humanos, materiales y financieros en Educacion Superior', '5 - Programa de gestion administrativa de las instituciones de educacion superior ejecutado', 'SECRETARIA ADMINISTRATIVA', 'SAD000.-Secretaria administrativa');

-- Dumping structure for table EasyPOA.anteproyecto
CREATE TABLE IF NOT EXISTS `anteproyecto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Actividad` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `Partida` int DEFAULT NULL,
  `Enero` float NOT NULL,
  `Febrero` float NOT NULL,
  `Marzo` float NOT NULL,
  `Abril` float NOT NULL,
  `Mayo` float NOT NULL,
  `Junio` float NOT NULL,
  `Julio` float NOT NULL,
  `Agosto` float NOT NULL,
  `Septiembre` float NOT NULL,
  `Octubre` float NOT NULL,
  `Noviembre` float NOT NULL,
  `Diciembre` float NOT NULL,
  `Total` float DEFAULT NULL,
  `Fecha` int DEFAULT NULL,
  `Calendario` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish_ci;

-- Dumping data for table EasyPOA.anteproyecto: ~6 rows (approximately)
INSERT INTO `anteproyecto` (`id`, `Actividad`, `Partida`, `Enero`, `Febrero`, `Marzo`, `Abril`, `Mayo`, `Junio`, `Julio`, `Agosto`, `Septiembre`, `Octubre`, `Noviembre`, `Diciembre`, `Total`, `Fecha`) VALUES
	(52, '1.1 Colocacion de estudiantes de Educacion Superio', 142001, 1010, 5580, 1870, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8460, 2022),
	(56, '1.1 Colocacion de estudiantes de Educacion Superio', 523001, 10800, 500, 220, 0, 0, 0, 0, 0, 0, 0, 0, 2890, 14410, 2022),
	(57, '1.1 Colocacion de estudiantes de Educacion Superio', 336001, 1000, 0, 0, 5000, 0, 0, 0, 1230, 0, 0, 0, 0, 7230, 2022),
	(58, '1.1 Colocacion de estudiantes de Educacion Superio', 141001, 60, 10, 10, 0, 0, 60, 0, 0, 0, 0, 0, 0, 140, 2022),
	(59, '1.1 Colocacion de estudiantes de Educacion Superio', 141001, 60, 10, 10, 0, 0, 60, 0, 0, 0, 0, 0, 0, 0, 2022),
	(60, '1.1 Colocacion de estudiantes de Educacion Superio', 141001, 500, 200, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1000, 1700, 2022);

-- Dumping structure for table EasyPOA.calendario
CREATE TABLE IF NOT EXISTS `calendario` (
  `idCalendario` int NOT NULL AUTO_INCREMENT,
  `actividad` varchar(3) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `anio` date NOT NULL,
  `partida` int NOT NULL,
  `enero` double NOT NULL,
  `febrero` double NOT NULL,
  `marzo` double NOT NULL,
  `abril` double NOT NULL,
  `mayo` double NOT NULL,
  `junio` double NOT NULL,
  `julio` double NOT NULL,
  `agosto` double NOT NULL,
  `septiembre` double NOT NULL,
  `octubre` double NOT NULL,
  `noviembre` double NOT NULL,
  `diciembre` double NOT NULL,
  `total` double NOT NULL,
  PRIMARY KEY (`idCalendario`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish_ci COMMENT='Tabla donde se almacena el presupuesto asignado para cada partida de cada actividad en todos los meses del año';

-- Dumping data for table EasyPOA.calendario: ~4 rows (approximately)
INSERT INTO `calendario` (`idCalendario`, `actividad`, `anio`, `partida`, `enero`, `febrero`, `marzo`, `abril`, `mayo`, `junio`, `julio`, `agosto`, `septiembre`, `octubre`, `noviembre`, `diciembre`, `total`) VALUES
	(1, '2.2', '0000-00-00', 141001, 2500, 0, 0, 5700, 0, 0, 0, 0, 0, 13000, 0, 0, 21200),
	(2, '2.2', '0000-00-00', 243001, 0, 5000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5000),
	(3, '3.1', '0000-00-00', 272001, 0, 0, 0, 0, 0, 0, 15000, 0, 0, 0, 0, 0, 15000),
	(4, '2.2', '0000-00-00', 132002, 0, 0, 500, 0, 0, 1200, 0, 0, 60000, 0, 0, 0, 0);

-- Dumping structure for table EasyPOA.partida
CREATE TABLE IF NOT EXISTS `partida` (
  `idPartida` int NOT NULL,
  `nombre` varchar(114) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL DEFAULT '',
  `fuenteFinanciamiento` varchar(20) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL DEFAULT '',
  `cuenta` varchar(9) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`idPartida`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish_ci COMMENT='Tabla para enlistar las partidas';

-- Dumping data for table EasyPOA.partida: ~111 rows (approximately)
INSERT INTO `partida` (`idPartida`, `nombre`, `fuenteFinanciamiento`, `cuenta`) VALUES
	(113001, 'SUELDOS ', '2', '2581'),
	(121001, 'HONORARIOS ASIMILABLES A SALARIOS', '2', '2581'),
	(132001, 'PRIMAS DE VACACIONES, DOMINICAL Y GRATIFICACION DE FIN DE A?O', '1', '2554'),
	(132002, 'GRATIFICACION DE FIN DE A?O', '3', '2554-2581'),
	(141001, 'APORTACIONES DE SEGURIDAD SOCIAL', '2', '2581'),
	(141004, 'APORTACIONES DE SEGURIDAD SOCIAL', '2', '2581'),
	(142001, 'APORTACIONES A FONDO DE VIVIENDA', '2', '2581'),
	(143001, 'APORTACIONES AL SISTEMA PARA EL RETIRO', '2', '2581'),
	(211001, 'MATERIAL DE OFICINA', '1', '2554'),
	(211002, 'GASTOS DE OFICINA', '1', '2554'),
	(212001, 'MATERIALES Y UTILES DE IMPRESION Y REPRODUCCION', '1', '2554'),
	(214001, 'MATERIAL PARA BIENES INFORMATICOS', '1', '2554'),
	(215001, 'SUSCRIPCIONES A PUBLICACIONES Y PERIODICOS', '1', '2554'),
	(216001, 'MATERIAL DE LIMPIEZA', '1', '2554'),
	(217001, 'MATERIAL DIDACTICO', '1', '2554'),
	(222001, 'ALIMENTACION DE ANIMALES', '1', '2554'),
	(223001, 'UTENSILIOS PARA EL SERVICIO DE ADMINISTRACION', '1', '2554'),
	(231001, 'PRODUCTOS AGRICOLAS', '1', '2554'),
	(235001, 'PRODUCTOS QUIMICOS, FARMACEUTICOS Y DE LABORATORIO', '1', '2554'),
	(241001, 'PRODUCTOS MINERALES NO METALICOS', '1', '2554'),
	(242001, 'CEMENTO Y PRODUCTOS DE CONCRETO', '1', '2554'),
	(243001, 'CAL, YESO Y PRODUCTOS DE YESO', '1', '2554'),
	(244001, 'MADERA Y PRODUCTOS DE MADERA', '1', '2554'),
	(245001, 'VIDRIO Y PRODUCTOS DE VIDRIO', '1', '2554'),
	(246001, 'MATERIAL ELECTRICO', '1', '2554'),
	(246002, 'MATERIAL ELECTRONICO', '1', '2554'),
	(247001, 'ARTICULOS METALICOS PARA LA CONSTRUCCION', '1', '2554'),
	(248001, 'MATERIALES COMPLEMENTARIOS', '1', '2554'),
	(249001, 'OTROS MATERIALES Y ARTICULOS DE CONSTRUCCION Y REPARACION', '1', '2554'),
	(251001, 'SUSTANCIAS QUIMICAS', '1', '2554'),
	(252001, 'FERTILIZANTES, PESTICIDAS Y OTROS AGROQUIMICOS', '1', '2554'),
	(253001, 'MEDICINA Y PRODUCTOS FARMACEUTICOS', '1', '2554'),
	(254001, 'MATERIALES Y SUMINISTROS MEDICOS', '1', '2554'),
	(255001, 'MATERIALES Y SUMINISTROS DE LABORATORIO', '1', '2554'),
	(256001, 'FIBRAS SINTETICAS, HULES PLASTICOS Y DERIVADOS', '1', '2554'),
	(259001, 'OTROS PRODUCTOS QUIMICOS', '1', '2554'),
	(261001, 'COMBUSTIBLES Y LUBRICANTES VEHICULOS Y EQUIPOS TERRESTRES', '1', '2554'),
	(271001, 'VESTUARIO Y UNIFORMES', '1', '2554'),
	(272001, 'PRENDAS PROTECCION', '1', '2554'),
	(273001, 'ARTICULOS DEPORTIVOS', '1', '2554'),
	(274001, 'PRODUCTOS TEXTILES', '1', '2554'),
	(291001, 'HERRAMIENTAS MENORES', '1', '2554'),
	(292001, 'REFACCIONES Y ACCESORIOS MENORES DE EDIFICIOS', '1', '2554'),
	(293001, 'REFACCIONES Y ACCESORIOS MENORES DE MOBILIARIO Y EQUIPO DE ADMINISTRACION, EDUCACIONAL Y RECREATIVO', '1', '2554'),
	(294001, 'REFACCIONES Y ACCESORIOS MENORES DE EQUIPO DE COMPUTO Y TECNOLOGIAS DE LA INFORMACION', '1', '2554'),
	(295001, 'REFACCIONES Y ACCESORIOS MENORES DE EQUIPO E INSTRUMENTAL MEDICO Y DE LABORATORIO', '1', '2554'),
	(296001, 'REFACCIONES Y ACCESORIOS MENORES DE EQUIPO DE TRANSPORTE', '1', '2554'),
	(298001, 'REFACCIONES Y ACCESORIOS MENORES DE MAQUINARIA Y OTROS EQUIPOS', '1', '2554'),
	(299001, 'REFACCIONES Y ACCESORIOS MENORES OTROS BIENES MUEBLES', '1', '2554'),
	(311001, 'SERVICIO DE ENERGIA ELECTRICA', '1', '2554'),
	(313001, 'SERVICIO DE AGUA', '1', '2554'),
	(314001, 'SERVICIO TELEFONICO TRADICIONAL', '1', '2554'),
	(315001, 'TELEFONIA CELULAR', '1', '2554'),
	(317001, 'SERVICIOS DE CONDUCCION DE SE?ALES', '1', '2554'),
	(318001, 'SERVICIOS POSTALES Y TELEGRAFICOS', '1', '2554'),
	(322001, 'ARRENDAMIENTO DE EDIFICIOS', '1', '2554'),
	(323002, 'ARRENDAMIENTO DE FOTOCOPIADO', '1', '2554'),
	(326001, 'ARRENDAMIENTO DE MAQUINARIA Y EQUIPO', '1', '2554'),
	(327001, 'ARRENDAMIENTO DE ACTIVOS INTANGIBLES', '2', '2581'),
	(329001, 'OTROS ARRENDAMIENTOS', '1', '2554'),
	(331002, 'SERVICIOS  DE CONTABILIDAD, AUDITORIA Y SERVICIOS  RELACIONADOS', '1', '2554'),
	(331003, 'CONSULTORIA', '1', '2554'),
	(332001, 'SER DE ARQUITECTURA, INGENIERIA Y ACT RELACIONADAS', '1', '2554'),
	(334001, 'SERVICIOS DE CAPACITACION', '1', '2554'),
	(336001, 'SERVICIOS DE APOYO ADMINISTRATIVO, TRADUCCION, FOTOCOPIADO E IMPRESION', '1', '2554'),
	(336002, 'FORMAS VALORADAS', '1', '2554'),
	(338001, 'SERVICIOS DE VIGILANCIA', '1', '2554'),
	(341001, 'INTERESES, DESCUENTOS Y OTROS SERVICIOS BANCARIOS', '1', '2554'),
	(345001, 'SEGUROS', '1', '2554'),
	(347001, 'FLETES Y MANIOBRAS', '1', '2554'),
	(351001, 'CONSERVACION Y MANTENIMIENTO MENOR DE INMUEBLES', '1', '2554'),
	(352001, 'MANTENIMIENTO DE MOBILIARIO Y EQUIPO DE ADMINISTRACION', '1', '2554'),
	(353001, 'INSTALACION, REPARACION Y MANTENIMIENTO DE EQUIPO DE COMPUTO Y TECNOLOGIA DE LA INFORMACION', '1', '2554'),
	(354001, 'INSTALACION REPARACION Y MANTENIMIENTO DE EQUIPO E INSTRUMENTAL MEDICO Y DE LABORATORIO', '1', '2554'),
	(355001, 'REPARACION Y MANTENIMIENTO DE EQUIPO DE TRANSPORTE', '1', '2554'),
	(357001, 'MANTENIMIENTO DE MAQUINARIA Y EQUIPO', '1', '2554'),
	(358001, 'SERVICIOS DE LAVANDERIA, LIMPIEZA Y FUMIGACION', '1', '2554'),
	(359001, 'SERVICIOS DE JARDINERIA Y FUMIGACION', '1', '2554'),
	(361001, 'DIFUSION DE PROGRAMAS Y ACTIVIDADES GUBERNAMENTALES', '1', '2554'),
	(361002, 'IMPRESIONES Y PUBLICACIONES OFICIALES', '1', '2554'),
	(362001, 'DIFUSION POR RADIO, TELEVISION Y OTROS MEDIOS DE MENSAJES COMERCIALES PARA PROMOVER LA VENTA DE BIENES O SERVICIOS', '1', '2554'),
	(363001, 'SERVICIOS DE CREATIVIDAD, PREPRODUCCION Y PRODUCCION DE PUBLICIDAD, EXCEPTO DE INTERNET', '1', '2554'),
	(371001, 'PASAJES AEREOS', '1', '2554'),
	(372001, 'PASAJES TERRESTRES', '1', '2554'),
	(375001, 'VIATICOS EN EL PAIS', '1', '2554'),
	(376001, 'VIATICOS EN EL EXTRANJERO', '1', '2554'),
	(381001, 'GASTOS DE CEREMONIAL', '1', '2554'),
	(382001, 'GASTOS DE ORDEN SOCIAL', '1', '2554'),
	(383001, 'CONGRESOS Y CONVENCIONES', '1', '2554'),
	(392001, 'PAGO DE ISR', '1', '2554'),
	(392006, 'PAGO DE DERECHOS', '1', '2554'),
	(398001, 'IMPUESTO SOBRE NOMINA Y OTROS QUE SE DERIVEN DE UNA RELACION LABORAL', '1', '2554'),
	(442001, 'BECAS', '1', '2554'),
	(511001, 'MUEBLES DE OFICINA Y ESTANTERIA', '1', '2554'),
	(512001, 'MUEBLES, EXCEPTO DE OFICINA Y ESTANTERIA', '1', '2554'),
	(515001, 'BIENES INFORMATICOS', '1', '2554'),
	(519001, 'EQUIPO DE ADMINISTRACION', '1', '2554'),
	(521001, 'EQUIPOS Y APARATOS AUDIOVISUALES', '1', '2554'),
	(523001, 'CAMARAS FOTOGRAFICAS Y DE VIDEO', '1', '2554'),
	(529001, 'EQUIPO EDUCACIONAL Y RECREATIVO', '1', '2554'),
	(531001, 'EQUIPO MEDICO Y DE LABORATORIO', '1', '2554'),
	(532001, 'INSTRUMENTAL MEDICO Y DE LABORATORIO', '1', '2554'),
	(541001, 'VEHICULOS Y EQUIPO TERRESTRE', '1', '2554'),
	(562001, 'MAQUINARIA Y EQUIPO INDUSTRIAL', '1', '2554'),
	(564001, 'SISTEMAS DE AIRE ACONDICIONADO, CALEFACCION', '1', '2554'),
	(565001, 'EQUIPOS Y APARATOS DE COMUNICACION Y TELECOMUNICACION', '1', '2554'),
	(566001, 'EQUIPOS DE GENERACION ELECTRICA, APARATOS Y ACCESORIOS ELECTRICOS', '1', '2554'),
	(567001, 'HERRAMIENTAS Y MAQUINAS-HERRAMIENTAS', '1', '2554'),
	(569001, 'OTROS EQUIPOS', '1', '2554'),
	(591001, 'SOFTWARE', '1', '2554'),
	(597001, 'LICENCIAS INFORMATICAS E INTELECTUALES', '1', '2554');

-- Dumping structure for table EasyPOA.requisicion
CREATE TABLE IF NOT EXISTS `requisicion` (
  `idRequisicion` int NOT NULL AUTO_INCREMENT,
  `folio` int DEFAULT NULL,
  `usuario` varchar(30) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `actividad` varchar(3) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `areaSolicitante` varchar(45) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `partida` int DEFAULT NULL,
  `solicitud` varchar(8) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `tipo` varchar(8) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `fecha` varchar(15) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `cantidad` mediumtext CHARACTER SET utf8 COLLATE utf8_spanish_ci,
  `unidadM` mediumtext CHARACTER SET utf8 COLLATE utf8_spanish_ci,
  `clave` mediumtext CHARACTER SET utf8 COLLATE utf8_spanish_ci,
  `descripcion` mediumtext CHARACTER SET utf8 COLLATE utf8_spanish_ci,
  `presupuesto` mediumtext CHARACTER SET utf8 COLLATE utf8_spanish_ci,
  `total` double DEFAULT NULL,
  `leyenda` varchar(1000) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `fuente` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `programa` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `mesAfectar` varchar(15) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `periodo` varchar(30) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `para` varchar(10) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`idRequisicion`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish_ci;

-- Dumping data for table EasyPOA.requisicion: ~4 rows (approximately)
INSERT INTO `requisicion` (`idRequisicion`, `folio`, `usuario`, `actividad`, `areaSolicitante`, `partida`, `solicitud`, `tipo`, `fecha`, `cantidad`, `unidadM`, `clave`, `descripcion`, `presupuesto`, `total`, `leyenda`, `fuente`, `programa`, `mesAfectar`, `periodo`, `para`) VALUES
	(1, 0, '0', '2.2', 'Medico', 132002, 'Material', 'Normal', '9-Dec-2022', '10', 'PZ', 'NA', 'Jeringas', '210', 210, 'Ninguna', 'NA', 'NA', 'Marzo', 'Permanente', 'Gestion'),
	(2, 0, '0', '2.2', 'Medico', 141001, 'Servicio', 'Normal', '4-Dec-2022', '10||4', 'PZ||PZ', 'NA||NA', 'Jeringas||Gasas', '200||42', 242, 'Ninguna', 'NA', 'NA', 'Octubre', 'Permanente', 'Liberacion'),
	(3, 0, '0', '3.1', 'Docencia', 272001, 'Material', 'Normal', '5-Dec-2022', '40', 'PZ', 'NA', 'Carpetas', '410.33', 410.33, 'Ninguna', 'NA', 'NA', 'Julio', 'Permanente', 'Gestion'),
	(4, 0, '0', '3.1', 'Medico', 272001, 'Material', 'Normal', '9-Dec-2022', '10', 'PZ', 'NA', 'Batas de laboratorio', '3000', 3000, 'Ninguna', 'NA', 'NA', 'Julio', 'Permanente', 'Gestion');

-- Dumping structure for table EasyPOA.transferencia
CREATE TABLE IF NOT EXISTS `transferencia` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Partida` int DEFAULT NULL,
  `Enero` float NOT NULL,
  `Febrero` float NOT NULL,
  `Marzo` float NOT NULL,
  `Abril` float NOT NULL,
  `Mayo` float NOT NULL,
  `Junio` float NOT NULL,
  `Julio` float NOT NULL,
  `Agosto` float NOT NULL,
  `Septiembre` float NOT NULL,
  `Octubre` float NOT NULL,
  `Noviembre` float NOT NULL,
  `Diciembre` float NOT NULL,
  `Total` float DEFAULT NULL,
  `Motivo` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `Justificacion` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish_ci;

-- Dumping data for table EasyPOA.transferencia: ~2 rows (approximately)
INSERT INTO `transferencia` (`id`, `Partida`, `Enero`, `Febrero`, `Marzo`, `Abril`, `Mayo`, `Junio`, `Julio`, `Agosto`, `Septiembre`, `Octubre`, `Noviembre`, `Diciembre`, `Total`, `Motivo`, `Justificacion`) VALUES
	(8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, ''),
	(9, 1233122, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 22, 'Por cambio de periodo', '');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
