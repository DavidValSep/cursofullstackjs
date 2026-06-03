DROP TABLE IF EXISTS reparto_soltera_otra_vez;
CREATE TABLE reparto_soltera_otra_vez
(
    nombre character varying(255) NOT NULL,
    temporadas integer,
    protagonico boolean,
    sueldo integer,
    PRIMARY KEY (nombre)
);

insert into reparto_soltera_otra_vez (nombre, temporadas, protagonico, sueldo) values ('Paz Bascuñán', 3, true, 100);
insert into reparto_soltera_otra_vez (nombre, temporadas, protagonico, sueldo) values ('Pablo Macaya', 3, true, 100);
insert into reparto_soltera_otra_vez (nombre, temporadas, protagonico, sueldo) values ('Cristián Arriagada', 3, true, 95);
insert into reparto_soltera_otra_vez (nombre, temporadas, protagonico, sueldo) values ('Josefina Montané', 2, true, 90);
insert into reparto_soltera_otra_vez (nombre, temporadas, protagonico, sueldo) values ('Loreto Aravena', 3, true, 95);
insert into reparto_soltera_otra_vez (nombre, temporadas, protagonico, sueldo) values ('Lorena Bosch', 2, true, 90);
insert into reparto_soltera_otra_vez (nombre, temporadas, protagonico, sueldo) values ('Nicolás Poblete', 2, true, 85);
insert into reparto_soltera_otra_vez (nombre, temporadas, protagonico, sueldo) values ('Héctor Morales', 3, true, 80);
insert into reparto_soltera_otra_vez (nombre, temporadas, protagonico, sueldo) values ('Aranzazú Yankovic', 2, true, 80);
insert into reparto_soltera_otra_vez (nombre, temporadas, protagonico, sueldo) values ('Luis Gnecco', 3, true, 95);
insert into reparto_soltera_otra_vez (nombre, temporadas, protagonico, sueldo) values ('Catalina Guerra', 3, true, 90);
insert into reparto_soltera_otra_vez (nombre, temporadas, protagonico, sueldo) values ('Solange Lackington', 2, true, 70);
insert into reparto_soltera_otra_vez (nombre, temporadas, protagonico, sueldo) values ('Ignacio Garmendia', 2, true, 70);
insert into reparto_soltera_otra_vez (nombre, temporadas, protagonico, sueldo) values ('Julio González', 3, true, 75);
insert into reparto_soltera_otra_vez (nombre, temporadas, protagonico, sueldo) values ('Antonella Orsini', 3, true, 70);
insert into reparto_soltera_otra_vez (nombre, temporadas, protagonico, sueldo) values ('Tamara Acosta', 1, false, 60);
insert into reparto_soltera_otra_vez (nombre, temporadas, protagonico, sueldo) values ('Silvia Santelices', 1, false, 55);
insert into reparto_soltera_otra_vez (nombre, temporadas, protagonico, sueldo) values ('Alejandro Trejo', 1, false, 55);
insert into reparto_soltera_otra_vez (nombre, temporadas, protagonico, sueldo) values ('Grimanesa Jiménez', 1, false, 60);

DROP TABLE IF EXISTS reparto_papi_ricky;
CREATE TABLE reparto_papi_ricky
(
    nombre character varying(255) NOT NULL,
    capitulos integer,
    protagonico boolean,
    sueldo integer,
    PRIMARY KEY (nombre)
);

insert into reparto_papi_ricky (nombre, capitulos, protagonico, sueldo) values ('Jorge Zabaleta', 135, true, 100);
insert into reparto_papi_ricky (nombre, capitulos, protagonico, sueldo) values ('Belén Soto', 135, true, 100);
insert into reparto_papi_ricky (nombre, capitulos, protagonico, sueldo) values ('Tamara Acosta', 135, true, 100);
insert into reparto_papi_ricky (nombre, capitulos, protagonico, sueldo) values ('María Elena Swett', 135, true, 100);
insert into reparto_papi_ricky (nombre, capitulos, protagonico, sueldo) values ('Juan Falcón', 135, true, 95);
insert into reparto_papi_ricky (nombre, capitulos, protagonico, sueldo) values ('Silvia Santelices', 135, true, 85);
insert into reparto_papi_ricky (nombre, capitulos, protagonico, sueldo) values ('Leonardo Perucci', 135, true, 85);
insert into reparto_papi_ricky (nombre, capitulos, protagonico, sueldo) values ('Teresita Reyes', 135, true, 80);
insert into reparto_papi_ricky (nombre, capitulos, protagonico, sueldo) values ('Luis Gnecco', 135, true, 75);
insert into reparto_papi_ricky (nombre, capitulos, protagonico, sueldo) values ('Alejandro Trejo', 135, true, 65);
insert into reparto_papi_ricky (nombre, capitulos, protagonico, sueldo) values ('Grimanesa Jiménez', 135, true, 60);
insert into reparto_papi_ricky (nombre, capitulos, protagonico, sueldo) values ('Remigio Remedy', 135, true, 60);
insert into reparto_papi_ricky (nombre, capitulos, protagonico, sueldo) values ('María Paz Grandjean', 135, true, 55);
insert into reparto_papi_ricky (nombre, capitulos, protagonico, sueldo) values ('Héctor Morales', 135, true, 50);
insert into reparto_papi_ricky (nombre, capitulos, protagonico, sueldo) values ('César Caillet', 135, true, 40);
insert into reparto_papi_ricky (nombre, capitulos, protagonico, sueldo) values ('José Tomás Guzmán', 135, true, 25);
insert into reparto_papi_ricky (nombre, capitulos, protagonico, sueldo) values ('Manuel Aguirre', 135, true, 30);

--1-1. Crear una consulta para obtener todos los actores que participaron en ambas teleseries, el
--sueldo que obtuvieron en cada una y la suma de ambos sueldos, todo esto ordenado por el
--nombre del actor.
SELECT 
    Sol.nombre, 
    Sol.sueldo AS sueldo_soltera, 
    Pap.sueldo AS sueldo_papi_ricky,
    (Sol.sueldo + Pap.sueldo) AS sueldo_total
FROM reparto_soltera_otra_vez Sol
JOIN reparto_papi_ricky Pap ON Sol.nombre = Pap.nombre
ORDER BY Sol.nombre ASC;

--1-2. Crear  una  consulta  para  obtener  todos  los  actores  que  participaron  exclusivamente  en
--soltera otra vez, con un sueldo mayor a 90.
SELECT 
    Sol.nombre, 
    Sol.sueldo, 
    Sol.temporadas
FROM reparto_soltera_otra_vez Sol
LEFT JOIN reparto_papi_ricky Pap ON Sol.nombre = Pap.nombre
WHERE Pap.nombre IS NULL 
  AND Sol.sueldo > 90;

--1-3. Crear una consulta para obtener solo los actores con sueldo inferior a 85 que actuaron en
--cualquiera de las dos teleseries, pero no en las dos.
SELECT 
--COALESCE para unificar datos de dos tablas quitando los que encuentre null en una pero esten en la otra y los ponemos en un alias
    COALESCE(Sol.nombre, Pap.nombre) AS nombre_actores,
    COALESCE(Sol.sueldo, Pap.sueldo) AS sueldo
FROM reparto_soltera_otra_vez Sol
FULL OUTER JOIN reparto_papi_ricky Pap ON Sol.nombre = Pap.nombre
WHERE (Sol.nombre IS NULL OR Pap.nombre IS NULL)
  AND (Sol.sueldo < 85 OR Pap.sueldo < 85);

--2-1. Crear los scripts  de creación de  tablas, campos y llaves  necesarias. Para poblar las tablas,
--incluya inserts de los mismos datos del ejercicio anterior adaptados a este nuevo sistema
--mejorado.
CREATE TABLE actores (
    id_actor SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE teleseries (
    id_teleserie SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE reparto_actores (
    id_actor INTEGER REFERENCES actores(id_actor),
    id_teleserie INTEGER REFERENCES teleseries(id_teleserie),
    protagonico BOOLEAN DEFAULT FALSE,
    sueldo INTEGER,
    detalle_tiempo INTEGER, 
    PRIMARY KEY (id_actor, id_teleserie)
);

INSERT INTO actores (nombre) VALUES 
('Paz Bascuñán'), ('Pablo Macaya'), ('Cristián Arriagada'), 
('Josefina Montané'), ('Jorge Zabaleta'), ('Tamara Acosta'), 
('María Elena Swett'), ('Belén Soto');

INSERT INTO teleseries (titulo) VALUES 
('Soltera Otra Vez'), 
('Papi Ricky');

INSERT INTO reparto_actores (id_actor, id_teleserie, protagonico, sueldo, detalle_tiempo) VALUES 
(1, 1, TRUE, 90, 3), 
(2, 1, TRUE, 88, 3), 
(3, 1, FALSE, 80, 3), 
(4, 1, FALSE, 75, 3),
(5, 2, TRUE, 100, 135), 
(6, 2, TRUE, 100, 135), 
(7, 2, TRUE, 95, 135),  
(8, 2, FALSE, 40, 135);

--2-3. Crear  una  consulta  que  muestre  todas  las  teleseries  y  todos  los  actores  de  reparto
--asociados. No incluya los actores de rol secundario.
SELECT 
    t.titulo AS teleserie,
    a.nombre AS actor
FROM teleseries t
JOIN reparto_actores ra ON t.id_teleserie = ra.id_teleserie
JOIN actores a ON ra.id_actor = a.id_actor
WHERE ra.protagonico = TRUE
ORDER BY t.titulo;

------ CORRECCIÓN ------    
-- REGULAR CONTENIDOS PARA QUE LA CONSULTA ANTERIOR DE RESULTADOS
-- Primero aseguramos que las teleseries existan
INSERT INTO teleseries (titulo) 
SELECT 'Soltera Otra Vez' WHERE NOT EXISTS (SELECT 1 FROM teleseries WHERE titulo = 'Soltera Otra Vez');
INSERT INTO teleseries (titulo) 
SELECT 'Papi Ricky' WHERE NOT EXISTS (SELECT 1 FROM teleseries WHERE titulo = 'Papi Ricky');

-- Aseguramos que los actores existan
INSERT INTO actores (nombre) 
SELECT 'Paz Bascuñán' WHERE NOT EXISTS (SELECT 1 FROM actores WHERE nombre = 'Paz Bascuñán');
INSERT INTO actores (nombre) 
SELECT 'Jorge Zabaleta' WHERE NOT EXISTS (SELECT 1 FROM actores WHERE nombre = 'Jorge Zabaleta');

-- POBLADO DE REPARTO (La clave para la consulta)
-- Usamos subconsultas para obtener los ID correctos y asegurar resultados
INSERT INTO reparto_actores (id_actor, id_teleserie, protagonico, sueldo, detalle_tiempo)
VALUES 
(
    (SELECT id_actor FROM actores WHERE nombre = 'Paz Bascuñán'),
    (SELECT id_teleserie FROM teleseries WHERE titulo = 'Soltera Otra Vez'),
    TRUE, -- Esto asegura que salga en tu consulta
    90, 
    3
),
(
    (SELECT id_actor FROM actores WHERE nombre = 'Jorge Zabaleta'),
    (SELECT id_teleserie FROM teleseries WHERE titulo = 'Papi Ricky'),
    TRUE, -- Esto asegura que salga en tu consulta
    100, 
    135
);