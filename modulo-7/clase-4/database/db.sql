-- 1. Tabla: clientes
CREATE TABLE clientes (
    rut VARCHAR(10) PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

-- 2. Tabla: direcciones
CREATE TABLE direcciones (
    id_direccion SERIAL PRIMARY KEY,
    rut VARCHAR(10) NOT NULL,
    direccion VARCHAR(200) NOT NULL,
    CONSTRAINT fk_direcciones_clientes FOREIGN KEY (rut) 
        REFERENCES clientes(rut) ON DELETE CASCADE
);

-- 3. Tabla: productos
CREATE TABLE productos (
    id_producto SERIAL PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    precio INTEGER NOT NULL,
    existencias INTEGER NOT NULL
);

-- 4. Tabla: orden
CREATE TABLE orden (
    id_orden SERIAL PRIMARY KEY,
    rut VARCHAR(10) NOT NULL,
    id_direccion INTEGER NOT NULL,
    precio_total INTEGER NOT NULL,
    CONSTRAINT fk_orden_clientes FOREIGN KEY (rut) 
        REFERENCES clientes(rut),
    CONSTRAINT fk_orden_direcciones FOREIGN KEY (id_direccion) 
        REFERENCES direcciones(id_direccion)
);

-- 5. Tabla: despachos
CREATE TABLE despachos (
    id_despacho SERIAL PRIMARY KEY,
    id_orden INTEGER NOT NULL,
    id_direccion INTEGER NOT NULL,
    CONSTRAINT fk_despachos_orden FOREIGN KEY (id_orden) 
        REFERENCES orden(id_orden) ON DELETE CASCADE,
    CONSTRAINT fk_despachos_direcciones FOREIGN KEY (id_direccion) 
        REFERENCES direcciones(id_direccion)
);

-- 6. Tabla: lista_productos (Detalle de la orden)
CREATE TABLE lista_productos (
    id_lista SERIAL PRIMARY KEY,
    id_orden INTEGER NOT NULL,
    id_producto INTEGER NOT NULL,
    cantidad_producto INTEGER NOT NULL,
    CONSTRAINT fk_lista_orden FOREIGN KEY (id_orden) 
        REFERENCES orden(id_orden) ON DELETE CASCADE,
    CONSTRAINT fk_lista_productos FOREIGN KEY (id_producto) 
        REFERENCES productos(id_producto)
);

-- ============================================================
-- DATOS DE PRUEBA
-- ============================================================

INSERT INTO clientes (rut, nombre) VALUES
    ('12345678-9', 'Ana García'),
    ('98765432-1', 'Carlos López'),
    ('11111111-1', 'María Fernández');

INSERT INTO direcciones (rut, direccion) VALUES
    ('12345678-9', 'Av. Principal 123, Santiago'),
    ('12345678-9', 'Calle Secundaria 456, Providencia'),
    ('98765432-1', 'Los Leones 789, Las Condes'),
    ('11111111-1', 'Irarrázaval 1000, Ñuñoa');

INSERT INTO productos (nombre, precio, existencias) VALUES
    ('Teclado Mecánico',  45000, 10),
    ('Mouse Inalámbrico', 25000, 5),
    ('Monitor 24"',      180000, 3),
    ('Auriculares USB',   35000, 0),
    ('Webcam HD',         28000, 8);


--revisar datos
    SELECT * FROM clientes;
    SELECT * FROM direcciones;
    SELECT * FROM productos;
    SELECT * FROM orden;
    SELECT * FROM despachos;  