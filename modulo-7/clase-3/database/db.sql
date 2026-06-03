--crear tabla
CREATE TABLE clientes (
   rut VARCHAR(20) PRIMARY KEY,
   nombre VARCHAR(100) NOT NULL,
   edad INT NOT NULL
);

--insertar datos
INSERT INTO clientes (rut, nombre, edad) VALUES ('11111111-0', 'spider man2', 60);

--consultar datos
SELECT * FROM clientes;


--POST
{
  "rut": "12345678-9",
  "nombre": "Juan Pérez",
  "edad": 30
}