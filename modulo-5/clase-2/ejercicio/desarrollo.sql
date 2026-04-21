select * from finanzas_personales

--1 - A quién(es) le debe más dinero y cuánto
SELECT nombre, le_debo
FROM finanzas_personales
ORDER BY le_debo DESC
LIMIT 1;

--2 - Quién(es) le debe más dinero a ud. y cuánto
SELECT nombre, me_debe
FROM finanzas_personales
ORDER BY me_debe DESC
LIMIT 1;

--3 - Cuánto dinero debe en total
SELECT SUM(le_debo) FROM finanzas_personales;

--4 - Cuánto dinero debe en promedio.
SELECT AVG(le_debo) AS promedio_deuda FROM finanzas_personales;

--5 - Suponiendo que no puede pagar más de una cuota al mes. ¿Cuántos meses demoraría en saldar su deuda?
SELECT SUM(cuotas_pagar) / 12 AS años, SUM(cuotas_pagar) % 12 AS meses FROM finanzas_personales;

--6 - ¿A cuánto ascendería su nueva deuda reducida?
SELECT SUM(le_debo) - SUM(me_debe) AS deuda_reducida FROM finanzas_personales;
--6 - ¿Cuánto tendría que pagar mensualmente para pagar todo lo
--que resta en las cuotas ya acordadas?
SELECT (SUM(le_debo) - SUM(me_debe)) / SUM(cuotas_pagar) AS pago_mensual_restante FROM finanzas_personales;

--7 - LE DEBES 50 LUCAS Y NO TE ACORDABAS
--Insertar un nuevo registro en la tabla
INSERT INTO finanzas_personales (nombre, me_debe, cuotas_cobrar, le_debo, cuotas_pagar)
VALUES ('pareja', 0, 0, 50000, 1);

--8 - ¿De cuánto será la cuota a pagar este mes?
SELECT SUM(le_debo / cuotas_pagar) AS cuota_total_mes FROM finanzas_personales WHERE cuotas_pagar > 0;

--9 - Realizar el update en la tabla.
UPDATE finanzas_personales SET cuotas_pagar = 13 WHERE nombre = 'almacén esquina';

--10 - ¿De cuánto será la cuota a pagar este mes?
SELECT SUM(le_debo / cuotas_pagar) AS cuota_total_mes FROM finanzas_personales WHERE cuotas_pagar > 0;