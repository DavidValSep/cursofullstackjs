-- 1. Crear las tablas del diagrama
    -- 1. Tabla Facturas
CREATE TABLE facturas (
    id SERIAL PRIMARY KEY,
    rut_comprador VARCHAR(12) NOT NULL,
    rut_vendedor VARCHAR(12) NOT NULL
);

    -- 2. Tabla Productos
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255)
);

    -- 3. Tabla Existencias (Depende de productos)
CREATE TABLE existencias (
    id SERIAL PRIMARY KEY,
    id_producto INTEGER NOT NULL,
    cantidad INTEGER NOT NULL DEFAULT 0,
    precio INTEGER NOT NULL,
    pesoKg INTEGER,
    CONSTRAINT fk_producto_existencias 
        FOREIGN KEY (id_producto) 
        REFERENCES productos(id) 
        ON DELETE CASCADE
);

    -- 4. Tabla Detalle Facturas (Depende de facturas y productos)
CREATE TABLE detalle_facturas (
    id SERIAL PRIMARY KEY,
    id_producto INTEGER NOT NULL,
    id_factura INTEGER NOT NULL,
    CONSTRAINT fk_producto_detalle 
        FOREIGN KEY (id_producto) 
        REFERENCES productos(id),
    CONSTRAINT fk_factura_detalle 
        FOREIGN KEY (id_factura) 
        REFERENCES facturas(id) 
        ON DELETE CASCADE
);

-- 2. Insertar 10 productos
INSERT INTO productos (nombre, descripcion) VALUES 
('Teclado Mecánico RGB', 'Teclado con switches blue y retroiluminación personalizada'),
('Mouse Gamer Pro', 'Mouse óptico de 16000 DPI con botones programables'),
('Audífonos HyperX Cloud', 'Auriculares con sonido envolvente 7.1 y micrófono'),
('Monitor 24" 144Hz', 'Monitor LED Full HD con tecnología FreeSync'),
('Pad Mouse XL', 'Superficie de tela de 90x40cm para escritorio completo'),
('Memoria RAM 16GB DDR4', 'Módulo de memoria de alta velocidad 3200MHz'),
('Disco SSD 1TB NVMe', 'Unidad de estado sólido de alta velocidad de lectura'),
('Gabinete ATX Vidrio', 'Chasis con panel lateral de vidrio templado y 3 ventiladores'),
('Fuente de Poder 750W', 'Fuente certificada 80 Plus Gold modular'),
('Webcam Full HD 1080p', 'Cámara con enfoque automático y micrófono integrado');

--3. Insertar existencias para todos los productos
-- Nota: Usamos una subconsulta para obtener el ID del producto por su nombre
INSERT INTO existencias (id_producto, cantidad, precio, pesoKg) VALUES 
((SELECT id FROM productos WHERE nombre = 'Teclado Mecánico RGB'), 50, 45000, 1),
((SELECT id FROM productos WHERE nombre = 'Mouse Gamer Pro'), 100, 35000, 1),
((SELECT id FROM productos WHERE nombre = 'Audífonos HyperX Cloud'), 30, 85000, 1),
((SELECT id FROM productos WHERE nombre = 'Monitor 24" 144Hz'), 15, 180000, 4),
((SELECT id FROM productos WHERE nombre = 'Pad Mouse XL'), 200, 15000, 1),
((SELECT id FROM productos WHERE nombre = 'Memoria RAM 16GB DDR4'), 40, 65000, 1),
((SELECT id FROM productos WHERE nombre = 'Disco SSD 1TB NVMe'), 60, 95000, 1),
((SELECT id FROM productos WHERE nombre = 'Gabinete ATX Vidrio'), 10, 75000, 6),
((SELECT id FROM productos WHERE nombre = 'Fuente de Poder 750W'), 25, 110000, 2),
((SELECT id FROM productos WHERE nombre = 'Webcam Full HD 1080p'), 50, 40000, 1);

-- 4. Insertar 5 facturas
INSERT INTO facturas (rut_comprador, rut_vendedor) VALUES 
('12.345.678-9', '99.888.777-6'),
('15.555.444-3', '99.888.777-6'),
('18.222.333-k', '99.888.777-6'),
('10.111.222-3', '88.777.666-5'),
('20.444.555-6', '88.777.666-5');

--5. Insertar el detalle para todas las facturas (entre 3 y 5 productos por factura)
-- Detalle para la Factura 1
INSERT INTO detalle_facturas (id_producto, id_factura) VALUES 
((SELECT id FROM productos WHERE nombre = 'Teclado Mecánico RGB'), 1),
((SELECT id FROM productos WHERE nombre = 'Mouse Gamer Pro'), 1),
((SELECT id FROM productos WHERE nombre = 'Pad Mouse XL'), 1);

-- Detalle para la Factura 2
INSERT INTO detalle_facturas (id_producto, id_factura) VALUES 
((SELECT id FROM productos WHERE nombre = 'Monitor 24" 144Hz'), 2),
((SELECT id FROM productos WHERE nombre = 'Webcam Full HD 1080p'), 2);

-- Detalle para la Factura 3
INSERT INTO detalle_facturas (id_producto, id_factura) VALUES 
((SELECT id FROM productos WHERE nombre = 'Memoria RAM 16GB DDR4'), 3),
((SELECT id FROM productos WHERE nombre = 'Disco SSD 1TB NVMe'), 3),
((SELECT id FROM productos WHERE nombre = 'Fuente de Poder 750W'), 3);

-- Detalle para la Factura 4
INSERT INTO detalle_facturas (id_producto, id_factura) VALUES 
((SELECT id FROM productos WHERE nombre = 'Gabinete ATX Vidrio'), 4),
((SELECT id FROM productos WHERE nombre = 'Audífonos HyperX Cloud'), 4);

-- Detalle para la Factura 5
INSERT INTO detalle_facturas (id_producto, id_factura) VALUES 
((SELECT id FROM productos WHERE nombre = 'Mouse Gamer Pro'), 5),
((SELECT id FROM productos WHERE nombre = 'Pad Mouse XL'), 5);

-- 6. Actualizar todas las existencias con cantidad 10
UPDATE existencias 
SET cantidad = 10;

-- 7. Agregar la columna fecha a facturas
ALTER TABLE facturas 
ADD COLUMN fecha DATE DEFAULT CURRENT_DATE;

-- 8. Actualizar el nuevo campo fecha con diferentes datos para cada
factura
UPDATE facturas SET fecha = '2026-04-20' WHERE id = 1;
UPDATE facturas SET fecha = '2026-04-21' WHERE id = 2;
UPDATE facturas SET fecha = '2026-04-22' WHERE id = 3;
UPDATE facturas SET fecha = '2026-04-23' WHERE id = 4;
UPDATE facturas SET fecha = '2026-04-24' WHERE id = 5;

-- 9. Eliminar la columna pesoKg de existencias
ALTER TABLE existencias 
DROP COLUMN pesoKg;

-- 10. Consultar una factura en particular junto a su detalle, el nombre de
-- cada producto y su precio
SELECT 
    fac.id AS nro_factura,
    fac.fecha,
    pro.nombre AS producto,
    exi.precio AS precio_unitario
FROM facturas fac
JOIN detalle_facturas df ON fac.id = df.id_factura
JOIN productos pro ON df.id_producto = pro.id
JOIN existencias exi ON pro.id = exi.id_producto
WHERE fac.id = 1;

-- 11. Consultar el valor final de una factura
SELECT SUM(exi.precio) AS valor_final_factura
FROM detalle_facturas df
JOIN existencias exi ON df.id_producto = exi.id_producto
WHERE df.id_factura = 1;

-- 12. Eliminar todos los productos
TRUNCATE TABLE productos RESTART IDENTITY CASCADE;

-- Para volver a empezar :P
DROP TABLE IF EXISTS detalle_facturas, existencias, facturas, productos CASCADE;